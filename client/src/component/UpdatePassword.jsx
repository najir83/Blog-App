import React, { useState } from "react";
import AxiosInstance from "../config/AxiosInstance";
import { toast, Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    // Placeholder for login logic

    try {
      const res = await AxiosInstance.post("/user/updatepassword", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      toast.success("Update successful", {
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
    } finally {
      setIsUpdating(false);
    }

    // setTimeout(() => {
    //   alert("Login attempted with: " + JSON.stringify(formData));
    // }, 1000);
  };

  return isUpdating ? (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Updating...</p>
    </div>
  ) : (
    <div className="flex items-center justify-center h-[84vh] ">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl shadow-lg w-full max-w-md bg-white text-gray-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            required
          />
        </div>
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
            placeholder="Enter your new password"
            required
          />
        </div>

        <button disabled={isUpdating}
          type="submit"
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
