import axios from "axios";

const instance = axios.create({
  baseURL: "https://server.onservic.com/",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;
