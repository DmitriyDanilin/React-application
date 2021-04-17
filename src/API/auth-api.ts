import { axiosInstance, ResponseType } from "./api";


export const authAPI = {
    authMe() {
        return axiosInstance.get<ResponseType<{id: number, email: string, login: string }>>(`/auth/me`).then(res => res.data);
    },
    login(email: string, password: string , rememberMe = false, captcha: null | string =null) {
        return axiosInstance.post<ResponseType<{userId: number }>>(`/auth/login`, { email, password, rememberMe, captcha }).then(res => res.data);
    },
    logout() {
        return axiosInstance.delete<ResponseType>(`/auth/login`).then(res => res.data);
    }
}