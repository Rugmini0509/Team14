import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../quickcart_assets/assets";
import { useAppContext } from "../context/AppContext";
const Navbar = () => {
  const {
    user,
    setuser,
    setUserLogin,
    navigate,
    setsearchquery,
    getCartCount,
    searchquery,
  } = useAppContext();
  const [open, setOpen] = React.useState(false);

  const logout = async () => {
    setuser(null);
    navigate("/");
  };

  useEffect(() => {
    if (searchquery.length > 0) {
      navigate("/products");
    }
  }, [searchquery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink
        to="/"
        onClick={() => {
          setOpen(false);
        }}
      >
        <span className="font-bold text-2xl">QuickCart</span>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Product</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setsearchquery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />

          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div
          onClick={() => {
            navigate("/cart");
          }}
          className="relative cursor-pointer"
        >
          <img
            src={assets.cart_icon}
            alt="cart_icon"
            className="w-6 opacity-80"
          />

          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => {
              setUserLogin(true);
            }}
            className="navbar-login-btn"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => {
            navigate("/cart");
          }}
          className="relative cursor-pointer"
        >
          <img
            src={assets.cart_icon}
            alt="cart_icon"
            className="w-6 opacity-80"
          />

          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`₹{
            open ? "flex" : "hidden"
          } absolute top-[60px] z-40 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <NavLink onClick={() => setOpen(false)} to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/products">
            All Products
          </NavLink>
          {user && (
            <NavLink onClick={() => setOpen(false)} to="/myorder">
              My Orders
            </NavLink>
          )}
          <NavLink onClick={() => setOpen(false)} to="/contact">
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {

                setOpen(false);
                setUserLogin(true);
              }}
              className="navbar-login-btn"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
