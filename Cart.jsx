import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets, dummyAddress } from '../quickcart_assets/assets';

const Cart = () => {
  const {
    Product,
    currency,
    removeFromCart,
    cartItems,
    setCartItems,
    getCartCount,
    updateCartItem,
    navigate,
    getCartTotalAmount,
    axios,
  } = useAppContext();

  const [CartArray, setCartArray] = useState([]);
  const [addressList, setAddressList] = useState(dummyAddress);
  const [showAddressList, setShowAddressList] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = Product.find(p => p._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  const placeOrder = () => {
    setCartItems({});
    localStorage.removeItem("cartItems"); // Only if you use localStorage
    navigate("/order-confirmation");
  };

  useEffect(() => {
    if (Product.length > 0 && cartItems) {
      getCart();
    }
  }, [Product, cartItems]);

  const totalPrice = getCartTotalAmount();
  const tax = Math.round(totalPrice * 0.02);
  const grandTotal = totalPrice + tax;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className='flex-1 max-w-4xl'>
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {CartArray.map((product, index) => (
          <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => { navigate(`products/${product.category.toLowerCase()}/${product._id}`); window.scrollTo(0, 0); }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Weight: <span>{product.weight || "N/A"}</span></p>
                  <div className='flex items-center'>
                    <p>Qty:</p>
                    <select
                      className='outline-none ml-1'
                      value={product.quantity}
                      onChange={(e) => updateCartItem(product._id, parseInt(e.target.value))}
                    >
                      {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
            <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
              <img src={assets.remove_icon} alt="remove" />
            </button>
          </div>
        ))}

        <button
          onClick={() => { navigate('/products'); window.scrollTo(0, 0); }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img src={assets.arrow_right_icon_colored} alt="" />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative mt-2 text-sm text-gray-700">
            <div>
              <p>{selectedAddress.firstName} {selectedAddress.lastName}</p>
              <p>{selectedAddress.street}, {selectedAddress.city}</p>
              <p>{selectedAddress.state} - {selectedAddress.zipcode}, {selectedAddress.country}</p>
              <p>Phone: {selectedAddress.phone}</p>
            </div>

            <button
              onClick={() => setShowAddressList(!showAddressList)}
              className="text-primary hover:underline text-sm mt-2"
            >
              Change
            </button>

            {showAddressList && (
              <div className="absolute top-24 bg-white shadow-md border border-gray-200 mt-2 w-full z-10">
                {addressList.map((addr, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddressList(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <p>{addr.firstName} {addr.lastName}</p>
                    <p>{addr.street}, {addr.city}, {addr.state}</p>
                  </div>
                ))}
                <p onClick={() => navigate("/add-address")} className='text-primary text-center cursor-pointer p-2 hover:bg-primary/10'>
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span><span>{currency}{totalPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span><span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span><span>{currency}{tax}</span>
          </p>
          <p className="flex justify-between text-base font-medium mt-3">
            <span>Total Amount:</span><span>{currency}{grandTotal}</span>
          </p>
        </div>

        <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
