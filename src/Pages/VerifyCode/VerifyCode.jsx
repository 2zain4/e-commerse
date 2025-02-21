import { useFormik } from "formik";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useContext, useState } from "react";
import { tokenContext } from "../../Context/TokenContext";
import { Helmet } from "react-helmet";

export default function VerifyCode() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { settoken } = useContext(tokenContext);

    const initialValues = { resetcode: "" };

    async function handleresetcode(data) {
        setIsLoading(true);
        try {
            let response = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                { resetCode: data.resetcode }
            );

            settoken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setErrorMsg(null);
            navigate('/resetpassword');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    function validateData(data) {
        let errors = {};
        if (!data.resetcode) {
            errors.resetcode = "Reset code required";
        }
        return errors;
    }

    const formik = useFormik({
        initialValues,
        validate: validateData,
        onSubmit: handleresetcode,
    });

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 w-full">
            <Helmet><title>Reset Code</title></Helmet>
            <h1 className="text-3xl font-bold my-3 w-1/2 mx-auto">Enter your verification code</h1>

            <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
                {errorMsg && (
                    <div className="bg-red-300 rounded-md p-3 my-2">{errorMsg}</div>
                )}

                <div className="mb-5">
                    <label htmlFor="resetcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Verification Code
                    </label>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        name="resetcode"
                        id="resetcode"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your verification code"
                        value={formik.values.resetcode}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.resetcode && formik.touched.resetcode && (
                        <small className="text-red-600">{formik.errors.resetcode}</small>
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
                            Verify
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}