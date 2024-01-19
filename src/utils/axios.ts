import axios from "axios";
import { VITE_SERVER_URL } from "./variaveisAmbiente"

const axiosInstance = axios.create({
    baseURL: VITE_SERVER_URL
})

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'

export { axiosInstance }