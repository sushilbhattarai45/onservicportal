import axios from "axios";

const instance = axios.create({
  baseURL: "https://server.onservic.com/",
  headers: {
    "Content-Type": "multipart/form-data",
    timeout: 3000,
  },
});

export default instance;
