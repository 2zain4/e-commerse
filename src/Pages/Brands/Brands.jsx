import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Brands() {
  const { getBrands, Brands } = useContext(CartContext);

  
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container ">
      <h1 className="text-2xl font-bold mb-4">Brands</h1>

      {Brands.length === 0 ? (
        <p>No items in Brands</p>
      ) : (
        <div className="row p-[35px]">
              {Brands.map((brand) => ( 
               
                <div key={brand._id} className="inner card-group h-[285px] p-3 rounded-md relative w-1/4">
            <div className="card border product rounded-md relative h-[271px] w-[] overflow-hidden">
              <img
                src={brand.image}
                className="card-img-top h-[189px] w-full "
                alt={brand.name}
              />
              <div className="card-body h-[73px] flex justify-center items-center ">
                <p className=" ">{brand.name}</p>
              </div>
            </div>
          </div>

         
           
              ))}
        </div>
      )}
    </div>
  );
}