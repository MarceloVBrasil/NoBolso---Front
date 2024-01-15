import axios from "axios";
import { variaveisAmbiente } from "./variaveisAmbiente";

const { VITE_SERVER_URL } = variaveisAmbiente

const axiosInstance = axios.create({
    baseURL: VITE_SERVER_URL
})

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'

export { axiosInstance }