import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import LatestProducts from '../../Components/LatestProducts';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import MainSlider from '../../Components/MainSlider/MainSlider';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Helmet><title>Home</title></Helmet>

      <MainSlider />
      <CategorySlider />

      <div className='container w-[90%]'>
    
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