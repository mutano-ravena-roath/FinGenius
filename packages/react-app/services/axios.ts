import axios, { AxiosInstance } from 'axios';
import cookie from "react-cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const token = cookie.load("token");

let config;

if (token) {
    config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
} else {
    config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

}

const api: AxiosInstance = axios.create({
    baseURL: `${API_URL}/api/v1`,
    timeout: 10000,
    headers: config.headers,
});


export default api;