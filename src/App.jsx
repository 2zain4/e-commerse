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
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
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
        { path: "Register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <TokenContextProvider>
      <CartContextProvider>
        <CounterContextProvider>
          <Offline>Only shown offline (surprise!)</Offline>
          <Toaster position="top-right"/>
          <RouterProvider router={routes}></RouterProvider>;
        </CounterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  );
}
