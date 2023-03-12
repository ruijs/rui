import axios from "axios";
import ruiPlayerConfig from "./rui-player-config";

const rapidService = axios.create({
  baseURL: ruiPlayerConfig.apiBase,
  validateStatus: null,
});

export default rapidService;