import React, { useContext } from "react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function ProductItem({ product, addProduct }) {
  const { addToWishlist, wishlist, removeFromWishlist } =
    useContext(CartContext);

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  async function handleWishlistClick() {
    if (isInWishlist) {
      await removeFromWishlist(product.id);
      toast.error("Removed from Wishlist ❤", {
        style: {
          backgroundColor: "red",
        },
      });
    } else {
      await addToWishlist(product.id);
      toast.success("Added to Wishlist ❤", {
        style: {
          backgroundColor: "#0aad0a",
        },
      });
    }
  }

  return (
    <div className="inner product p-2 border border-transparent rounded-md relative overflow-hidden">
      <Link to={`/producdetails/${product.id}`} className="block">
        <img
          src={product.imageCover}
          className="w-full p-2"
          alt={product.title}
        />
        <small className="text-green-600">{product.category?.name}</small>
        <h5 className="font-semibold my-2">
          {product.title.split(" ").slice(0, 3).join(" ")}
        </h5>
        <div className="flex justify-between">
          <p>{product.price} EGP</p>
          <p className="flex items-center">
            <span className="text-yellow-400 mx-1">
              <FaStar />
            </span>
            {product.ratingsAverage}
          </p>
        </div>
      </Link>

      <div className="flex justify-end">
        <button
          className="text-3xl  "
          onClick={handleWishlistClick}
          style={{ color: isInWishlist ? "red" : "black" }}
        >
          ❤
        </button>
      </div>

      <button
        className="btn w-52 mx-auto flex justify-center"
        onClick={() => addProduct(product.id)}
      >
        + Add
      </button>
    </div>
  );
}
