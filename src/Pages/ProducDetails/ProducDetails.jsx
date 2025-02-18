import axios from "axios";
import styles from "./ProducDetails.module.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProducDetails() {
  const { productId } = useParams();
  const [details, setDetails] = useState({});

const {addTOCart} = useContext(CartContext)

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute bottom-[-25px] left-[44%] h-[8px] w-[14px] bg-[#D6D6D6] rounded-[3px] hover:bg-[#869791]"
      ></button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute bottom-[-25px] right-[44%] h-[8px] w-[14px] bg-[#D6D6D6] rounded-[3px] hover:bg-[#869791]"
      ></button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  async function getProducDetails() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setDetails(response.data.data);
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  }

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






  useEffect(() => {
    if (productId) {
      getProducDetails();
    }
  }, [productId]);

  return (
    <div className="container">
      <div className="row my-14">
        
        <div className="w-1/3 ">
          {details.images && (
            <Slider {...settings}>
              {details.images.map((img, i) => (
                <img src={img} className="w-full" key={i} alt="" />
              ))}
            </Slider>
          )}
        </div>

        <div className="w-2/3 p-4 flex flex-col justify-center items-center">
          <div className="inner p-4">
            {" "}
            <h2 className="font-medium text-3xl">{details.title}</h2>
            <p className="font-normal text-base">{details.description}</p>
            <div className="flex justify-between w-full">
              <span>{details.price} EGP</span>
              <p className="flex items-center">
                <span className="text-yellow-400 mx-1">
                  <FaStar />
                </span>
                {details.ratingsAverage}
              </p>
            </div>
          </div>

          <div className="btn bg-[#4DD056] border-transparent w-2/3 mx-auto flex justify-center mt-4"  onClick={()=>{addProduct(details.id)}}>
            <div>+ Add</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
