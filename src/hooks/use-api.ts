import axios from "axios";

export const useApi = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  return { api };
};
