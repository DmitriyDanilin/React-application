import axios from 'axios'
import { ProfileType } from '../types/types';

export const axiosInstance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0',
        headers: { "API-KEY": "97132c0f-39d9-4230-aaf8-d365f7c03dce" }
    }
);

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchRequired = 10
}

export type ResponseType<D = {}> = {
    data: D
    resultCode: ResultCodeEnum
    messages: Array<string>
}
