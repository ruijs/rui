import axios from "axios";

const rapidApi = axios.create({
  baseURL: "/api",
  validateStatus: null,
});

export default rapidApi;