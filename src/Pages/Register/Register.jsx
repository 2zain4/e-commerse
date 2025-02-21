import { useFormik } from "formik";
import styles from "./Register.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoadeing] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  async function handleRegister(data) {
    setIsLoadeing(true);
    let x = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((response) => {
        console.log(response);

        setErrorMsg(null);
        setIsLoadeing(false);
        navigate("/login");
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setIsLoadeing(false);
      });
  }

  function validateData(data) {

    let errors = {};

    const NameRegex = /^[a-zA-Z]{3,}$/;
    const EmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^[A-Za-z1-9]{8,12}$/;
    const phoneRegex = /^01[0125][0-9]{8}$/;

    if (!data.name || data.name.trim() === "") {
      errors.name = "Name required";
    } else if (!NameRegex.test(data.name)) {
      errors.name = "name min length is 3";
    }

    
    if (data.email === "") {
      errors.email = "Email required";
    } else if (!EmailRegex.test(data.email)) {
      errors.email = "Email is not valid";
    }

    if (data.password === "") {
      errors.password = "passwor required";
    } else if (!passwordRegex.test(data.password)) {
      errors.password = "password is not valid";
    }

    if (data.rePassword === "") {
      errors.rePassword = "repasswor required";
    } else if (data.rePassword != data.password) {
      errors.rePassword = "repassword is not match";
    }

    if (data.phone === "") {
      errors.phone = "phone required";
    } else if (!phoneRegex.test(data.phone)) {
      errors.phone = "phone is not valid";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues,

    validate: validateData,

    onSubmit: handleRegister,
  });

  return (
    
    <section className="bg-gray-50 dark:bg-gray-900  p-3  w-full mx-auto">
      <Helmet><title> Register</title></Helmet>
      
      <h1 className="text-3xl font-bold my-3  w-1/2 mx-auto ">Register Now</h1>

      <form className=" w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
        {errorMsg && (
          <div className="bg-red-300 rounded-md p-3 my-2">{errorMsg}</div>
        )}
        <div className="mb-5  w-5/6">
          <label
            htmlFor="Name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            onChange={formik.handleChange}
            type="Name"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Inter Your Name "
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <small className="text-red-600">{formik.errors.name}</small>
          )}
        </div>

        <div className="mb-5  w-5/6">
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

        <div className="mb-5  w-5/6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Inter Your password "
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <small className="text-red-600">{formik.errors.password}</small>
          )}
        </div>

        <div className="mb-5  w-5/6">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your rePassword
          </label>
          <input
            onChange={formik.handleChange}
            type="Password"
            name="rePassword"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Inter Your rePassword "
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <small className="text-red-600">{formik.errors.rePassword}</small>
          )}
        </div>

        <div className="mb-5  w-5/6">
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
            placeholder="Inter Your phone "
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <small className="text-red-600">{formik.errors.phone}</small>
          )}
        </div>

        <div className="flex justify-end">
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
              className="text-white border bg-[#4FA74F] disabled:border disabled:border-slate-500 disabled:bg-transparent disabled:text-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              disabled={!formik.isValid}
            >
              Register Now
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
