import axios from "axios"
import { API_URL } from "./constant"
import { getSession } from "./auth"

const axiosClient = axios.create({
  baseURL: API_URL || "", // you can point this to your backend if needed
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getSession()?.token || ""}`,
  },
})

export default axiosClient
