

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    getData();
    getWishlist();
  }, []);

  const headers = {
    token: localStorage.getItem("token"),
  };

  function addToWishlist(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers }
      )
      .then((response) => {
        getWishlist();
        return response.data;
      })
      .catch((err) => err);
  }

  function removeFromWishlist(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((response) => {
        getWishlist();
        return response.data;
      })
      .catch((err) => err);
  }

  function getWishlist() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((response) => {
        setWishlist(response.data.data);
        return response.data;
      })
      .catch((err) => err);
  }

  function getBrands() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/brands", { headers })
      .then((response) => {
        setBrands(response.data.data);
        return response.data;
      })
      .catch((err) => err);
  }

  async function updateProductQuantity(productId, count) {
    try {
      const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
        count,
      });
  
      return data; 
    } catch (error) {
      console.error("Error updating product quantity:", error);
      return null;
    }
  }


  function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => {
        setNumOfCartItems(0);
        setCartId(null);
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  function addTOCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        { headers }
      )
      .then((response) => response.data)
      .catch((err) => err);
  }

  function getLoggedCartData() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
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

  async function getData() {
    let response = await getLoggedCartData();
    setNumOfCartItems(response.numOfCartItems);
    setCartId(response.cartId);
  }

  function cashOnDelivery(data) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      data,
      { headers }.then((response) => response).catch((err) => err)
    );
  }






  function onlinePayment(data) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        data,
        {
          params: {
            url: "http://localhost:5173",
          },
          headers,
        }
      )
      .then((response) => response.data)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
    value={{
      addTOCart,
      getLoggedCartData,
      removeCartItem,
      numOfCartItems,
      setNumOfCartItems,
      setCartId,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      getWishlist,
      getBrands,
      Brands,
      clearCart,
      cashOnDelivery,
      onlinePayment,
      checkoutData,
      setCheckoutData, 
      updateProductQuantity
    }}
  >
    {children}
  </CartContext.Provider>
  );
}



