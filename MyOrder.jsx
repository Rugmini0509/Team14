import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyAddress, dummyOrders } from "../quickcart_assets/assets";

const MyOrder = () => {
  const [myOrder, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrder = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase text-primary">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myOrder.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl shadow-md"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col max-md:gap-2">
            <span className="text-gray-500 font-semibold">
              OrderId : {order._id}
            </span>
            <span className="text-gray-500 font-semibold">
              Payment : {order.paymentType}
            </span>
            <span className="text-gray-500 font-semibold">
              Total Amount : {currency}
              {order.amount}
            </span>
          </p>

          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-gray-200 mt-4 pt-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <img
                    src={item.product.image[0]}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-600">
                    Category : {item.product.category}
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-sm font-semibold text-primary gap-1">
                <p className="font-medium">Quantity : {item.quantity || "1"}</p>
                <p className="font-medium">Status : {order.status}</p>
                <p className="font-medium">
                  Date : {new Date(order.createdAt).toLocaleDateString()}
                </p>
                </div>

              <div className="flex flex-col text-sm text-gray-700 gap-1">
                
                <p className="font-semibold text-primary">
                  Amount : {currency}
                  {item.product.offerPrice * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
