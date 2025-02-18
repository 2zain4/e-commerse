import React, { useContext } from 'react'
import {Helmet} from "react-helmet";
import LatestProducts from '../../Components/LatestProducts';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import MainSlider from '../../Components/MainSlider/MainSlider';
export default function Home() {


   

  return (
    <div>
    <Helmet>home</Helmet>
<MainSlider/>
<CategorySlider/>

<div className='container w-[90%]'><LatestProducts/></div>









    
    </div>
  )
}
