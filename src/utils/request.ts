import axios from "axios";

export const openAiService = axios.create({
  baseURL: "",
});

export const musicService = axios.create({
  baseURL: "https://music.owocc.me",
  timeout: 5000,
});

musicService.interceptors.response.use((value) => {
  return value.data;
});
