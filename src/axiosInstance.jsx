import axios from "axios";

const instance = axios.create({
  baseURL: "https://tebakkata.ruben.my.id",
});

export default instance;
