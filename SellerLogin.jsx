import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";


const SellerLogin = () => {
  const { navigate,axios, isseller, setseller } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
  try{
  event.preventDefault();
      const {data} = await axios.post('/api/seller/login',{
      email,
      password
    })
    if(data.success){
      setseller(true);
      navigate("/seller")
    }
    else{
      toast.error(data.message)
    }
  } 
  catch(error){
    toast.error(error.message)
  }    
    
  };

  useEffect(() => {
    if (isseller) {
      navigate("/seller");
    }
  }, [isseller]);

  return (
    !isseller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center justify-center px-4 bg-gray-50"
      >
        <div className="bg-white p-6 md:p-10 rounded-md shadow-md w-full max-w-md">
          <p className="text-xl font-semibold text-primary mb-6 text-center">
            <span className="text-gray-800">Seller</span> Login
          </p>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dull transition"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
