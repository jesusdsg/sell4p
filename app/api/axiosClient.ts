import axios from "axios";
//import { auth } from "../firebase/firebaseConfig";
//import { API_URL } from "@env";
//import { useSpinnerStore } from "../store/spinnerStore";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL!;
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    console.log(`Request: ${config.url}`);
    //const token = auth.currentUser && (await auth.currentUser.getIdToken());
    /* if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } */

    return config;
  },
  (error) => {
    console.error(`Request error: ${JSON.stringify(error, null, 2)}`);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(`Response error: ${JSON.stringify(error, null, 2)}`);
    return Promise.reject(error);
  }
);

export default axiosClient;
