import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem/ProductItem";
import Loader from "./Loader/Loader";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";


export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      console.log(res.data.data); 
      setProducts(res.data.data); 
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getProducts(); 
  }, []);

const {addTOCart} = useContext(CartContext )

  async function addProduct(id) {
    let response = await addTOCart(id);
    if (response.status === 'success') {
      toast.success('It has been successfully added. 🛺', {
        style: {
          backgroundColor: '#0aad0a' 
        }
      });
    }else{
      toast.error('It has been successfully add',{
        style: {
          backgroundColor: 'red' 
        }
      } )
    }
  }

  return <div className="row">

{products.length > 0 ?
 products.map((product) => (
<div className=" p-2 w-1/4   sm:w-1/2 md:w-1/3 lg:w-1/4  " key={product.id}>

<ProductItem product={product} addProduct={addProduct} />

</div> )):
<Loader/>
}
  </div>
}