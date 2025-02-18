import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

const headers = {
  token: localStorage.getItem("token"),
};

function addTOCart(id) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: id,
      },
      {
        headers,
      }
    )
    .then((response) => response.data)
    .catch((err) => err);
}

function getLoggedCartData() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers,
    })
    .then((response) => response.data)
    .catch((err) => err);
}

function removeCartItem(productId) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error removing item:", error);
      return error;
    });
}

function updateProductQuantity(productId , count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: count,
      },
      {
        headers,
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error removing item:", error);
      return error;
    });
}

export default function CartContextProvider({ children }) {
  return (
    <CartContext.Provider
      value={{ addTOCart, getLoggedCartData, removeCartItem , updateProductQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
