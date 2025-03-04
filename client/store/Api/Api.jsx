import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const request = axios.create({ baseURL, withCredentials: true });
export default request;