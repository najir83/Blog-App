import React, { useState } from "react";
import AxiosInstance from "../config/AxiosInstance";
import useStore from "../store";
import { toast,Bounce } from "react-toastify";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { userLogin, setLogin, isSpin, setSpin } = useStore();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(1);
    try {
      const response = await AxiosInstance.post("/user/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setLogin(1);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (e) {
      toast.error(e.response.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // console.log(e);
    } finally {
      setSpin(0);
    }
  };

  return (
    <div className="flex items-center justify-center h-[84vh] ">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl shadow-lg w-full max-w-md bg-white text-gray-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Forget password?{" "}
          <a href="/updatepassword" className="text-blue-500 hover:underline">
            UpdatePassword
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
