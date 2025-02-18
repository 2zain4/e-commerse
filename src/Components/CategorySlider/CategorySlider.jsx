import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[-25px] left-[48.7%] h-[8px] w-[14px] bg-[#D6D6D6]   rounded-[3px] hover:bg-[#869791]"
    >
    
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[-25px] right-[48.7%] h-[8px] w-[14px] bg-[#D6D6D6]   rounded-[3px] hover:bg-[#869791]"
    >
      
    </button>
  );
};

const settings = {
  dots: false, // إخفاء النقاط السفلية
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: <CustomNextArrow />, // زر التقدم مخصص
  prevArrow: <CustomPrevArrow />, // زر الرجوع مخصص
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2,
        initialSlide: 1,
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
  ]
};

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="my-8  ">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} >
            <img src={category.image} className="w-full h-[250px]" alt={category.name} />
            <h3 className="mx-3 font-semibold text-[28px]">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}