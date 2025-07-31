import axios from "axios";

// console.log(process.env.HOST_SERVER);
const AxiosInstance = axios.create({
  // baseURL: 'https://blog-app-id5d.onrender.com',
  baseURL: import.meta.env.VITE_HOST_SERVER,
  withCredentials: true,
});

export default AxiosInstance;
