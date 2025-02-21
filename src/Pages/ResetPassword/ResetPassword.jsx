import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = { email: "", newPassword: "" };

  async function handleResetPassword(data) {
    setIsLoading(true);
    try {
      let response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email: data.email, newPassword: data.newPassword }
      );

      setErrorMsg(null);
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  function validateData(data) {
    let errors = {};

    const EmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^[A-Za-z0-9@#]{8,12}$/;

    if (!data.email) {
      errors.email = "Email required";
    } else if (!EmailRegex.test(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.newPassword) {
      errors.newPassword = "Password required";
    } else if (!passwordRegex.test(data.newPassword)) {
      errors.newPassword = "Password must be 8-12 characters";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues,
    validate: validateData,
    onSubmit: handleResetPassword,
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 w-full">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <h1 className="text-3xl font-bold my-3 w-1/2 mx-auto">
        Reset your account password
      </h1>

      <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
        {errorMsg && (
          <div className="bg-red-300 rounded-md p-3 my-2">{errorMsg}</div>
        )}

        <div className="mb-5">
          <input
            onChange={formik.handleChange}
            type="text"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <small className="text-red-600">{formik.errors.email}</small>
          )}
        </div>

        <div className="mb-5">
          <input
            onChange={formik.handleChange}
            type="password"
            name="newPassword"
            id="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your New Password"
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <small className="text-red-600">{formik.errors.newPassword}</small>
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
              Reset Password
            </button>
          )}
        </div>
      </form>
    </section>
  );
}