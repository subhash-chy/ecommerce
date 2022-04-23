import moment from "moment";

function Order(props) {
  const { id, amount, amountShipping, items, timestamp, images } = props;
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center gap-x-10 p-5 bg-gray-100">
        <div>
          <p className="text-xs font-bold">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("YYYY MMM DD")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <span className="font-bold">Rs. {amount}</span>
            <span>- Delivery Rs. {amountShipping}</span>
          </p>
        </div>
        <p className="text-sm sm:text-xl text-yellow-500 whitespace-nowrap text-right self-end flex-1">
          {items.length} items
        </p>

        <p className="absolute top-2 right-2 text-xs w-40 lg:w-72 truncate whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10 ">
        <div className="flex items-center overflow-x-auto gap-5">
          {images.map((image) => (
            <img
              src={image}
              alt={image}
              className="h-20 object-contain sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
