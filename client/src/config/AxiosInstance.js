import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: 'https://blog-app-id5d.onrender.com',
  withCredentials: true,
  
});

export default AxiosInstance;