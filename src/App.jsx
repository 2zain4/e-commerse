import React from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CounterContextProvider from "./Context/CounterContext";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import ProducDetails from "./Pages/ProducDetails/ProducDetails";
import NotFound from "./Pages/NotFound/NotFound";
import { Offline, Online } from "react-detect-offline";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Checkout from "./Pages/Checkout/Checkout";
import AllOrders from "./Pages/AllOrders/AllOrders";
import WishList from "./Pages/WishList/WishList";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";

import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Brands from "./Pages/Brands/Brands";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },

        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },

        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },

        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },

        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },

     

       

       
       

        
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },

        {
          path: "producdetails/:productId",
          element: (
            <ProducDetails>
              <ProducDetails />
            </ProducDetails>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "Register", element: <Register /> },
        { path: "resetpassword", element: <ResetPassword /> },


        
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();
  
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TokenContextProvider>
          <CartContextProvider>
            <CounterContextProvider>
              <Offline>Only shown offline (surprise!)</Offline>
              <Toaster position="top-right" />
              <RouterProvider router={routes}></RouterProvider>;
              <ReactQueryDevtools initialIsOpen={false} />
            </CounterContextProvider>
          </CartContextProvider>
        </TokenContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}
