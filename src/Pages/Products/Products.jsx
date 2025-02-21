import styles from "./Products.module.css";
import { Helmet } from "react-helmet";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProductItem from "../../Components/ProductItem/ProductItem";
import LatestProducts from "../../Components/LatestProducts";
import { useSelector } from "react-redux";
import { useState } from "react"; 

export default function Products() {
  const { counter, data } = useSelector((state) => {
    return state.counter;
  });
  console.log(counter);

  const [searchQuery, setSearchQuery] = useState(""); 

  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <div className="container w-[90%] pt-5">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
        />

        <LatestProducts searchQuery={searchQuery} />
      </div>
    </div>
  );
}