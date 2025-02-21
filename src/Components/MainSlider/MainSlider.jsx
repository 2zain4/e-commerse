import img1 from './../../assets/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img2 from './../../assets/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import img3 from './../../assets/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import img4 from './../../assets/41nN4nvKaAL._AC_SY200_.jpg'
import img5 from './../../assets/61cSNgtEISL._AC_SY200_.jpg'
import Slider from 'react-slick'

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[-25px] left-[44%] h-[8px] w-[14px] bg-[#D6D6D6]   rounded-[3px] hover:bg-[#869791]"
    >
    
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[-25px] right-[44%] h-[8px] w-[14px] bg-[#D6D6D6]   rounded-[3px] hover:bg-[#869791]"
    >
      
    </button>
  );
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1 ,
  nextArrow: <CustomNextArrow />, 
  prevArrow: <CustomPrevArrow />, 
};

export default function MainSlider() {
  return (
    <div className='row flex justify-center pt-11 '>

   <div className='w-[324px] '>

   <Slider {...settings}>
        <div>
        <img src={img5} className='w-full h-[450px]' alt="" />
        </div>
        <div>
        <img src={img4} className='w-full h-[450px]' alt="" />
        </div>
        <div>
        <img src={img3} className='w-full h-[260px]' alt="" />
        </div>
        </Slider>
   </div>

   <div className='w-[324px] '>
  <img src={img1} className='w-full h-[260px]' alt="" />
  <img src={img2} className='w-full h-[260px] ' alt="" />
   </div>
    </div>
  )
}
