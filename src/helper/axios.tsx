
import axios from "axios"

import { env_data } from '../config/config';

const { server_url, dev_server_url, env } = env_data;

export const axiosPublic = axios.create({
    baseURL: env == "dev" ? dev_server_url : server_url,
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: env == "dev" ? dev_server_url : server_url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
});