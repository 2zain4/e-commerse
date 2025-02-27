import React from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./Categories.module.css";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  

  return (
    <div className="container ">
      <Helmet><title>Categories</title></Helmet>
      {isLoading && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        
  
        {data?.data?.data?.map((category) => (
          <div key={category._id} className="-3 rounded-md">
            <div className="border product rounded-md overflow-hidden shadow-lg">
              <img
                src={category.image}
                className="card-img-top h-[300px] w-full object-cover object-top"
                alt={category.name}
              />
              <div className="card-body h-[73px] flex justify-center items-center border">
                <p className="text-2xl font-black text-[#198754]">{category.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
