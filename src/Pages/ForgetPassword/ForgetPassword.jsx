import { useFormik } from "formik";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useContext, useState } from "react";
import { tokenContext } from "../../Context/TokenContext";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {

    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoadeing] = useState(false);
    const navigate=useNavigate()
    const { token, settoken } = useContext(tokenContext);

    const initialValues = {
        email: "",
      };
    
      async function handforgetpassword(data) {
        setIsLoadeing(true);
        let x = await axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data)
        .then((response) => {
          settoken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setErrorMsg(null);
          setIsLoadeing(false);
          navigate('/verifycode');
          
        })
        .catch((error) => {
          setErrorMsg(error.response.data.message);
          setIsLoadeing(false);
        });
      }
    



      function validateData(data) {

        let errors = {};
    
    
        if (data.email === "") {
          errors.email = "Email required";
        } 
        
        return errors;
      }


      const formik = useFormik({
        initialValues,
    
        validate: validateData,
    
        onSubmit: handforgetpassword,
      });


  return (
    <section className="bg-gray-50 dark:bg-gray-900  p-3  w-full">
    <Helmet><title>Login</title></Helmet>
    
    <h1 className="text-3xl font-bold my-3  w-1/2 mx-auto ">please enter your verification code</h1>

    <form className=" w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
      {errorMsg && (
        <div className="bg-red-300 rounded-md p-3 my-2">{errorMsg}</div>
      )}
   

      <div className="mb-5">
        <label
          htmlFor="Email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Email
        </label>
        <input
          onChange={formik.handleChange}
          type="text"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Inter Your Email "
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
          <small className="text-red-600">{formik.errors.email}</small>
        )}
      </div>

    

      

      <div className="flex justify-between">
    
   
{isLoading ? (
  <button
    className="text-white border bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-not-allowed"
    disabled
  >
    Loading...
  </button>
) : (
  <button
    type="submit"
    className="btn bg-transparent text-[#3FA43F] border-[#3FA43F] font-semibold hover:text-white hover:bg-[#3FA43F]"
    disabled={!formik.isValid}
  >
    Veritfy
  </button>
)}
</div>

    </form>
  </section>
  )
}
