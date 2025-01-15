import axios from 'axios'
import dotenv from "dotenv";

dotenv.config();

export const axiosInstance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:8080/'
});