import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";

export default function AllOrders() {
  const { checkoutData, getLoggedCartData } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await getLoggedCartData();
        if (data && data.data) {
          setCartData(data.data);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold">Order Details</h2>

      {cartData ? (
        <div className="border p-4 rounded-md">
          <h3 className="text-xl font-semibold">Products</h3>
          {cartData.products?.map((product) => (
            <div key={product.id} className="flex items-center p-2 border-b">
              <img
                src={product.product.imageCover}
                className="w-16 h-16"
                alt={product.product.title}
              />
              <div className="ml-4">
                <p>{product.product.title}</p>
                <p className="text-gray-600">{product.price} EGP</p>
              </div>
            </div>
          ))}
          <p className="mt-3 font-bold">Total Price: {cartData.totalCartPrice} EGP</p>
        </div>
      ) : (
        <p>Loading cart data...</p>
      )}

      {checkoutData ? (
        <div className="border p-4 rounded-md mt-5">
          <h3 className="text-xl font-semibold">Shipping Details</h3>
          <p><strong>City:</strong> {checkoutData.city}</p>
          <p><strong>Phone:</strong> {checkoutData.phone}</p>
          <p><strong>Details:</strong> {checkoutData.details}</p>
        </div>
      ) : (
        <p>No shipping details available.</p>
      )}
    </div>
  );
}