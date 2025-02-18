import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  const { getLoggedCartData, removeCartItem, updateProductQuantity } =
    useContext(CartContext);
  const [cartData, setCartData] = useState(null);

  async function getData() {
    try {
      let data = await getLoggedCartData();
      setCartData(data.data);
    } catch (error) {}
  }

  async function deleteProduct(id) {
    console.log("Trying to delete product with id:", id);
    if (!id) {
      return;
    }
    try {
      await removeCartItem(id);
      getData();
    } catch (error) {}
  }

  async function updateProduct(id, count) {

    const data= await updateProductQuantity(id , count)
    setCartData(data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <Helmet>cart</Helmet>

      <div className="flex justify-between my-4">
        <h4 className="text-2xl font-semibold">Cart Shop</h4>
        <h6>
          <span className="font-semibold">Total Price:</span>
          {cartData?.totalCartPrice ?? "0"} EGP
        </h6>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartData?.products?.length > 0 ? (
              cartData.products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product?.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product?.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product?.title}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {/* زر النقصان */}
                      <button
                        onClick={() => {
                          updateProduct(
                            product.product.id,
                             product.count - 1
                            );
                        }}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100"
                        type="button"
                      >
                        <span className="sr-only">Decrease quantity</span>
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

                      {/* عرض العدد الحالي */}
                      <p className="mx-2">{product.count}</p>

                      {/* زر الزيادة */}
                      <button
                       onClick={() => {
                        updateProduct(
                          product.product.id,
                           product.count + 1
                          );
                      }}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100"
                        type="button"
                      >
                        <span className="sr-only">Increase quantity</span>
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
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProduct(product.product?.id)}
                      className="text-red-600 flex"
                    >
                      <FaTrash /> Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
