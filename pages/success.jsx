import { Header } from "../components";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

function Success() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircleIcon className="h-10 text-green-500" />
            <h1 className="text-xl font-bold md:text-3xl">
              Thank you! Your order has been successfully confirmed.
            </h1>
          </div>

          <p>
            Thank you for shopping with us. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Itaque exercitationem labore
            voluptates rerum vero culpa dignissimos ipsum modi deserunt deleniti
            sed laudantium similique quisquam veritatis porro perferendis
            doloremque, minus molestiae?
          </p>

          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go To My Order
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
