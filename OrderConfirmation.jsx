import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-3xl font-bold mb-4 text-green-600">Order Placed Successfully!</h1>
    <p className="mb-6 text-lg">Thank you for your purchase. Your order has been placed.</p>
    <Link to="/products" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
      Continue Shopping
    </Link>
  </div>
);

export default OrderConfirmation;