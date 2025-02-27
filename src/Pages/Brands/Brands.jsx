import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Brands() {
  const { getBrands, Brands } = useContext(CartContext);

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Brands</h1>

      {Brands.length === 0 ? (
        <p className="text-center">No items in Brands</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {Brands.map((brand) => (
            <div key={brand._id} className="p-3 rounded-md">
              <div className="border product rounded-md overflow-hidden shadow-lg">
                <img
                  src={brand.image}
                  className="h-48 w-full object-cover"
                  alt={brand.name}
                />
                <div className="p-4 text-center">
                  <p className="font-semibold">{brand.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}