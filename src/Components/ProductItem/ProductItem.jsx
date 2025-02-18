
import React from 'react';
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function ProductItem({ product, addProduct }) {
  return (
    <div className="inner product p-2 border border-transparent rounded-md relative overflow-hidden">
      <Link to={`/producdetails/${product.id}`} className="block">
        <img src={product.imageCover} className="w-full p-2" alt={product.title} />
        <small className="text-green-600">{product.category?.name}</small>
        <h5 className="font-semibold my-2">
          {product.title.split(' ').slice(0, 3).join(' ')}
        </h5>
        <div className="flex justify-between">
          <p>{product.price} EGP</p>
          <p className="flex items-center">
            <span className='text-yellow-400 mx-1'><FaStar /></span>
            {product.ratingsAverage}
          </p>
        </div>
      </Link>

      <button 
        className="btn w-52 mx-auto flex  justify-center "
        onClick={() => addProduct(product.id)}
      >
        + Add
      </button>
    </div>
  );
}
