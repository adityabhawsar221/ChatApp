import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch the password and confirm password fields
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    // console.log(userInfo);
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white p-8 rounded-lg shadow-2xl w-96 space-y-6"
  >
    <h1 className="text-4xl font-extrabold text-center text-green-600">
      Chat<span className="text-black">App</span>
    </h1>
    <h2 className="text-2xl text-gray-800 font-semibold text-center">Signup</h2>

    {/* Fullname */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-600 mb-2">Fullname</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-5 h-5 text-gray-500 mx-3"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="w-full p-3 border-none rounded-lg focus:ring-0"
          placeholder="Enter your fullname"
          {...register("fullname", { required: true })}
        />
      </div>
      {errors.fullname && (
        <span className="text-red-500 text-sm mt-1">This field is required</span>
      )}
    </div>

    {/* Email */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-5 h-5 text-gray-500 mx-3"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="email"
          className="w-full p-3 border-none rounded-lg focus:ring-0"
          placeholder="Enter your email"
          {...register("email", { required: true })}
        />
      </div>
      {errors.email && (
        <span className="text-red-500 text-sm mt-1">This field is required</span>
      )}
    </div>

    {/* Password */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-5 h-5 text-gray-500 mx-3"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="w-full p-3 border-none rounded-lg focus:ring-0"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
      </div>
      {errors.password && (
        <span className="text-red-500 text-sm mt-1">This field is required</span>
      )}
    </div>

    {/* Confirm Password */}
    <div className="relative">
      <label className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-5 h-5 text-gray-500 mx-3"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="w-full p-3 border-none rounded-lg focus:ring-0"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required: true,
            validate: validatePasswordMatch,
          })}
        />
      </div>
      {errors.confirmPassword && (
        <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
      )}
    </div>

    {/* Text & Button */}
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-700">
        Have an account?{" "}
        <Link
          to="/login"
          className="text-green-600 font-semibold underline hover:text-green-700 transition-colors"
        >
          Login
        </Link>
      </p>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-colors"
      >
        Signup
      </button>
    </div>
  </form>
</div>

    </>
  );
}

export default Signup;
