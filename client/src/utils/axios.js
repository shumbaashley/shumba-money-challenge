import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: URL,
});

export default instance;
