import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToBag } from "../state-machine/slices/bagSlice";

function Product(props) {
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const { id, title, price, description, category, image } = props;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  const dispatch = useDispatch();
  const addItemToBag = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
    };

    dispatch(addToBag(product));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} objectFit="contain" width={200} height={200} />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i + 1} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <p className="mb-5">Rs. {price * 100}</p>

      {hasPrime && (
        <div className="flex items-center gap-x-2 -mt-5">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt="Prime Symbol"
          />
          <p className="text-xs text-gray-500">FREE Delivery</p>
        </div>
      )}

      <button onClick={addItemToBag} className="mt-auto button">
        Add to Bag
      </button>
    </div>
  );
}

export default Product;
