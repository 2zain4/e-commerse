import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();
  const { cashOnDelivery, setCartId, setNumOfCartItems, onlinePayment, setCheckoutData } =
    useContext(CartContext);

  const savedData = JSON.parse(localStorage.getItem("checkoutData")) || {
    details: "",
    phone: "",
    city: "",
  };

  function validateData(data) {
    let errors = {};

    const DetailsRegex = /^[a-zA-Z\s]{3,}$/;
    const CityRegex = /^[a-zA-Z\s]{3,}$/;
    const phoneRegex = /^01[0125][0-9]{8}$/;

    if (!data.details || !DetailsRegex.test(data.details.trim())) {
      errors.details = "Details must be at least 3 letters";
    }

    if (!data.city || !CityRegex.test(data.city.trim())) {
      errors.city = "City name must be at least 3 letters";
    }

    if (!data.phone) {
      errors.phone = "Phone required";
    } else if (!phoneRegex.test(data.phone)) {
      errors.phone = "Phone is not valid";
    }

    return errors;
  }

  async function handleSubmit(data) {
    setCheckoutData(data);
    
    let savedOrders = JSON.parse(localStorage.getItem("checkoutHistory")) || [];
  
    savedOrders.push(data);
  
    localStorage.setItem("checkoutHistory", JSON.stringify(savedOrders));
  
    try {
      let response = await onlinePayment({ shippingAddress: data });
      if (response.status === "success") {
        localStorage.removeItem("checkoutData");
        
        window.location.href = response.session.url;
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  }




  
  const formik = useFormik({
    initialValues: savedData,
    validate: validateData,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(formik.values));
  }, [formik.values]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-3 w-full mx-auto">
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      <form
        className="w-full mx-auto flex flex-col items-center justify-center min-h-screen"
        onSubmit={formik.handleSubmit}
      >
        {errorMsg && (
          <div className="bg-red-300 rounded-md p-3 my-2">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="bg-green-300 rounded-md p-3 my-2">{successMsg}</div>
        )}

        <div className="mb-5 w-5/6">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your details
          </label>
          <input
            onChange={formik.handleChange}
            type="text"
            name="details"
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Details"
            value={formik.values.details}
            onBlur={formik.handleBlur}
          />
          {formik.touched.details && formik.errors.details && (
            <small className="text-red-600">{formik.errors.details}</small>
          )}
        </div>

        <div className="mb-5 w-5/6">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your city
          </label>
          <input
            onChange={formik.handleChange}
            type="text"
            name="city"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your City"
            value={formik.values.city}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city && (
            <small className="text-red-600">{formik.errors.city}</small>
          )}
        </div>

        <div className="mb-5 w-5/6">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone
          </label>
          <input
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <small className="text-red-600">{formik.errors.phone}</small>
          )}
        </div>

        <button
          type="submit"
          className="btn bg-transparent text-[#0DCAF0] border-[#0DCAF0] hover:bg-[#0DCAF0] hover:text-black w-5/6"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}