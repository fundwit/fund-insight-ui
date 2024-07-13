import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default client;