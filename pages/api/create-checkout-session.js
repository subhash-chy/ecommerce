const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "npr",
      unit_amount: item.price * 10000, // * 100 converts to 'PAISA' 10,000 because converting to npr and then paisa
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: transformedItems,
    payment_method_types: ["card"],
    shipping_rates: ["shr_1Kpp8wSChcKWneTF4PbtNniG"],
    shipping_address_collection: {
      allowed_countries: ["US", "GB"],
    },
    mode: "payment",
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
  });

  res.status(200).json({ id: session.id });
};
