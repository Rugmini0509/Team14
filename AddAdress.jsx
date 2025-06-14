import React, { useState } from "react";
import { assets } from "../quickcart_assets/assets";

const AddAdress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmithandler = (e) => {
    e.preventDefault();
    console.log("Address submitted:", address);
    // You can send address to backend here (API call)
  };

  return (
    <div className="mt-16 pb-14">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmithandler} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={address.firstName}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={address.lastName}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />

            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={address.street}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />

            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                value={address.zipcode}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 w-full rounded hover:bg-primary-dull hover:cursor-pointer transition"
            >
              Save Address
            </button>
          </form>
        </div>
        <img src={assets.add_address_iamge} alt="Add address" />
      </div>
    </div>
  );
};

export default AddAdress;
