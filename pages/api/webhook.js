import { buffer } from "micro";
import * as admin from "firebase-admin";

// Securing a connection to Firebase from backend
const serviceAccount = require("../../permissions.json");

// Using '!' to initialize app only once.
// We should not initialize if the app is already being initialized
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Connnection to Stripe establishment
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(
        `SUCCESS: Order ${session.id} has been added to the database`
      );
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"];

    let event;

    // Verifying if events posted from stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (error) {
      console.log("ERROR", error.message);
      return res.status(400).send("Webhook error:", error.message);
    }

    // checkout session complete event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .error((error) =>
          res.status(400).send(`Webhook error: ${error.message}`)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    // Resolved by stripe
    externalResolver: true,
  },
};
