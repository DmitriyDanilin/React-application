import { axiosInstance } from "./api";

type getCaptchaType = {
    url: string
}
export const securityAPI = {
    getCaptcha(){
        return axiosInstance.get<getCaptchaType>(`/security/get-captcha-url`).then(res => res.data);
    }
}