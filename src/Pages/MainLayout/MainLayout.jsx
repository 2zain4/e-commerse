import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";

export default function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navbar />
      <div className=" relative">
        {loading ? (
          <div className="flex justify-center items-center h-[500px]">
            <Loader />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      
    </div>
  )
}