import axios, { AxiosInstance } from 'axios';


export const axiosClient: AxiosInstance = axios.create({
    baseURL: process.env.ORIGIN_DEV
})
