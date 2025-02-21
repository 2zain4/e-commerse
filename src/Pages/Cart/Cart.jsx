import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    getLoggedCartData,
    removeCartItem,
    updateProductQuantity,
    setNumOfCartItems,
    setCartId,
    numOfCartItems,
    clearCart,
  } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);

  const navigate = useNavigate();

  async function getData() {
    try {
      let data = await getLoggedCartData();
      setCartData(data.data);
    } catch (error) {}
  }

  async function deleteProduct(id) {
    let response = await removeCartItem(id);
    setNumOfCartItems(response.numOfCartItems);
    setCartId(response.cartId);
    getData(response.data);
  }

  async function updateProduct(id, count) {
    if (count < 1) return; 

    try {
      let response = await updateProductQuantity(id, count);
      if (response && response.data) {
        setCartData(response.data);
      } else {
        getData();
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  }

  async function clearCartHandler() {
    try {
      await clearCart();
      setCartData(null);
    } catch (error) {}
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container p-[80px]">
      <Helmet></Helmet>
      <Helmet>
        <title>cart</title>
      </Helmet>

      <div>
        <div className="relative overflow-x-auto  sm:rounded-lg p-10">
          <div className=" flex justify-between">
            <h4 className="text-2xl font-semibold">Cart Shop</h4>
            <button
              className="btn bg-[#0D6EFD] font-semibold"
              onClick={() => {
                setCartData(cartData);
                navigate("/checkout");
              }}
            >
              Check Out
            </button>
          </div>
          <div className=" flex justify-between">
            <h6>
              <span className="font-semibold">Total Price:</span>
              <span className="text-[#22dd31]">
                {" "}
                {cartData?.totalCartPrice ?? "0"}
              </span>{" "}
              EGP
            </h6>
            <h6 className="font-semibold">
              total number of items:{" "}
              <span className="text-[#22dd31]">{numOfCartItems}</span>
            </h6>
          </div>
          <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <div>
              {cartData?.products?.length > 0 ? (
                cartData.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-800 p-6 flex justify-between items-center"
                  >
                    <div className="p-4 flex items-center">
                      <img
                        src={product.product?.imageCover}
                        className="w-16 md:w-[181px] max-w-full max-h-full"
                        alt={product.product?.title}
                      />
                      <div>
                        <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product?.title}
                        </div>
                        <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price} EGP
                        </div>
                        <div className="px-6 py-4">
                          <button
                            onClick={() => deleteProduct(product.product?.id)}
                            className="text-red-600 flex"
                          >
                            <FaTrash /> Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4">
                      <div className="flex items-center text-black">
                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-5xl font-medium h-9 w-9  border border-[#22dd31] rounded-md"
                          type="button"
                          disabled={product.count <= 1} 
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>

                        <p className="mx-2">{product.count}</p>

                        <button
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-5xl font-medium h-9 w-9  border border-[#22dd31] rounded-md"
                          type="button"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <div colSpan="5" className="text-center py-4">
                    No Data Found
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={clearCartHandler}
              className="px-4 py-2 text-black border border-[#22dd31] font-semibold rounded-md "
            >
              Clear Your Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
