
import axios from "axios"

import { Config } from '../Config/Config';

const { server_url } = Config;

export const axiosPublic = axios.create({
    baseURL: server_url,
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: server_url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});