import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function WishlistPage() {
const { wishlist, removeFromWishlist, addTOCart, setCartId, setNumOfCartItems } = useContext(CartContext);
const navigate = useNavigate();
async function handleRemove(id) {
await removeFromWishlist(id);
}
async function handleAddToCart(id) {
let response = await addTOCart(id);
setNumOfCartItems(response.numOfCartItems);
setCartId(response.cartId);
}
return (



<div>
<div>

    {wishlist.length === 0 ? (
      <div className="text-center py-4">No Data Found</div>
    ) : (
      <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <div>
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white border-b dark:bg-gray-800 p-6 flex justify-between items-center"
            >
              <div className="p-4 flex items-center">
                <img
                  src={product.imageCover}
                  className="w-16 md:w-[181px] max-w-full max-h-full"
                  alt={product.title}
                />
                <div>
                  <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </div>
                  <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </div>
                  <div className="px-6 py-4">
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="text-red-600 flex"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="px-4 py-2 bg-green-500 text-white border border-[#22dd31] font-semibold rounded-md"
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

);
}
