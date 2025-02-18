import { useFormik } from "formik";
// import styles from "./Register.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom"; // تأكد من أنك مثبت react-router-dom
import axios from "axios";
import { useContext, useState } from "react";
import { tokenContext } from "../../Context/TokenContext";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoadeing] = useState(false);
  const navigate=useNavigate()
  const { token, settoken } = useContext(tokenContext);
console.log("Current Token:", token);
  
  const initialValues = {
    email: "",
    password: "",
  };

  async function handleLogin(data) {
    setIsLoadeing(true);
    console.log(data);
    let x = await axios
    .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
    .then((response) => {
      settoken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setErrorMsg(null);
      setIsLoadeing(false);
      navigate('/');
      
    })
    .catch((error) => {
      setErrorMsg(error.response.data.message);
      setIsLoadeing(false);
    });
  }

  function validateData(data) {
    console.log(data);

    let errors = {};

    const EmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^[A-Za-z1-9]{8,12}$/;

    

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

    

    return errors;
  }

  const formik = useFormik({
    initialValues,

    validate: validateData,

    onSubmit: handleLogin,
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900  p-3  w-full">
      <h1 className="text-3xl font-bold my-3  w-1/2 mx-auto ">Login Now</h1>

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

        <div className="mb-5">
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

        

        <div className="flex justify-between">
        <small>
  New account <Link to={'/register'}>Register</Link>
</small>
     
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
      className="btn"
      disabled={!formik.isValid}
    >
      Login
    </button>
  )}
</div>

      </form>
    </section>
  );
}

