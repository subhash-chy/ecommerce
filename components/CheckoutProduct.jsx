import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { removeFromBag } from "../state-machine/slices/bagSlice";

function CheckoutProduct(props) {
  const { id, title, description, price, rating, category, image, hasPrime } =
    props;

  const dispatch = useDispatch();

  const removeFromBags = () => {
    // Remove item from Redux store
    dispatch(removeFromBag({ id }));
  };
  return (
    <div className="grid grid-cols-5 gap-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <p className="font-semibold">Rs. {price * 100}</p>

        {hasPrime && (
          <div className="flex items-center gap-x-2">
            <img
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt="Amazon prime"
            />
            <p className="text-xs text-gray-500">FREE Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-2 my-auto justify-self-end">
        <button onClick={removeFromBags} className="button mt-auto">
          Remove From Bag
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
