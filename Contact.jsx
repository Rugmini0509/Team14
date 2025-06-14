import React from "react";

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto mt-20 mb-16 px-4">
      <h2 className="text-3xl font-semibold text-primary mb-6 text-center">
        Contact Us
      </h2>

      <form className="space-y-6 bg-white p-6 rounded-lg shadow-md border">
        <div>
          <label className="block mb-1 text-gray-700 font-semibold">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-semibold">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="Type your message here..."
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-primary/90 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
