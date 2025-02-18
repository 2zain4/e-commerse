import React, { use, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom"; // تأكد من أنك مثبت react-router-dom
import { CounterContext } from "../../Context/CounterContext";
import { tokenContext } from "../../Context/TokenContext";


export default function Navbar() {


const {counter} = useContext(CounterContext)
const {token , settoken} = useContext(tokenContext)
const navigate=useNavigate()
function logoutUser() {
  localStorage.removeItem("token"); // استخدم اسم المفتاح الصحيح
  settoken(null);
  navigate('/login');
}

  return (
    <nav className="bg-slate-300 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <Link to="/" className="flex items-center space-x-3">
          <FaShoppingCart className="text-[36px] text-[#4FA74F]" />
          <span className="self-center text-2xl font-semibold dark:text-white">
            fresh cart
          </span>
        </Link>


        <button
          data-collapse-toggle="navbar-menu"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* القائمة */}
      

{token&& <div className="hidden w-full  md:block md:w-auto" id="navbar-menu">
  <ul className="font-medium text-[14px] flex flex-col  md:flex-row md:space-x-8 md:p-0 md:mt-0">
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `block py-2  ${isActive ? "text-black font-bold" : "text-gray-900"} dark:text-white`
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `block py-2  ${isActive ? "text-black font-bold" : "text-gray-900"} dark:text-white`
        }
      >
        Cart
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `block py-2  ${isActive ? "text-black font-bold" : "text-gray-900"} dark:text-white`
        }
      >
        Wish List
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `block py-2  ${isActive ? "text-black font-bold" : "text-gray-900"} dark:text-white`
        }
      >
        Products
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/categories"
        className={({ isActive }) =>
          `block py-2  ${isActive ? "text-black font-bold" : "text-gray-900"} dark:text-white`
        }
      >
        Categories
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/brands"
        className={({ isActive }) =>
          `block py-2  ${isActive ? "text-black font-bold" : "text-gray-900"} dark:text-white`
        }
      >
        Brands
      </NavLink>
    </li>
  </ul>
</div>} 

        {/* الأيقونات الجانبية */}
        <div className="hidden md:block md:w-auto btn-su">
          <ul className="flex items-center space-x-6">
            
          
            {token&&(
           <>
             <li className="relative">
              <Link to="/cart" className="flex items-center">
                <FaShoppingCart className="text-slate-600 text-[31px]" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-2">
                  4
                </span>
              </Link>
            </li>
            <li>
              <div onClick={()=>{logoutUser()}}  className="block cursor-pointer py-2 px-3 text-gray-900 dark:text-white">
                Log out
              </div>
            </li>
           </>
          )}
           {!token&&(
            <>
           <li>
              <Link to="/login" className="block py-2 px-3 text-gray-900 dark:text-white">
                Log in
              </Link>
            </li>
            <li>
              <Link to="/Register" className="block py-2 px-3 text-gray-900 dark:text-white">
              Register
              </Link>
            </li></>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
