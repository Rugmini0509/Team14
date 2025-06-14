import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../quickcart_assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [isseller, setseller] = useState(false);
  const [showUserLogin, setUserLogin] = useState(false);

  const [Product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchquery, setsearchquery] = useState("");
  const currency = import.meta.env.VITE_CURRENCY;

  // Fetch seller authentication status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get('/api/seller/is-auth');
      setseller(!!data.success);
    } catch (error) {
      setseller(false);
    }
  };

  // Fetch products (dummy data for now)
  const fetchProducts = async () => {
    setProduct(dummyProducts);
  };

  // Register user
  const registerUser = async (name, email, password) => {
    try {
      const { data } = await axios.post('/api/register', { name, email, password });
      toast.success(data.message);
      setUserLogin(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  };

  // Login user
  const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post('/api/login', { email, password });
    setuser({ userId: data.userId, email }); // Save user info in context
    toast.success(data.message);
    setUserLogin(false); // Close modal or redirect as needed
  } catch (error) {
    toast.error(error.response?.data?.error || "Login failed");
  }
  };

  // Cart functions
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Removed from Cart");
    setCartItems(cartData);
  };

  useEffect(() => {
    fetchSeller();
    fetchProducts();
  }, []);

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartTotalAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = Product.find((product) => product._id === itemId);
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const value = {
    navigate,
    user,
    setuser,
    isseller,
    setseller,
    showUserLogin,
    setUserLogin,
    Product,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    setsearchquery,
    searchquery,
    getCartCount,
    getCartTotalAmount,
    axios,
    registerUser,
    loginUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
