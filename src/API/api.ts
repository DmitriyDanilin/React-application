import axios from 'axios'
import { ProfileType } from '../types/types';

const axiosInstance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0',
        headers: { "API-KEY": "97132c0f-39d9-4230-aaf8-d365f7c03dce" }
    }
);
type UserType = {
    name: string
    id: number
    photos: {small: null | string, large: null | string}
    followed: boolean
}

type getUsersType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
 }
type followUnfollowType ={
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
//done
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return axiosInstance.get<getUsersType>(`/users?page=${currentPage}&count=${pageSize}`).then(response => { return response.data })
    },
    Follow(id: number) {
        return axiosInstance.post<followUnfollowType>(`/follow/${id}`).then(response => { return response.data })
    },
    unFollow(id: number) {
        return axiosInstance.delete<followUnfollowType>(`/follow/${id}`).then(response => { return response.data })
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchRequired = 10
}

type AuthMeType = {
   data: {id: number, email: string, login: string }
   resultCode: ResultCodeEnum
   messages: Array<string>
}
type LoginType = {
    data: {userId: number }
    resultCode: ResultCodeEnum
    messages: Array<string>
 }
 type LogOutType = {
    data: { }
    resultCode: ResultCodeEnum
    messages: Array<string>
 }

//done
export const authAPI = {
    authMe() {
        return axiosInstance.get<AuthMeType>(`/auth/me`).then(res => res.data);
    },
    login(email: string, password: string , rememberMe = false, captcha: null | string =null) {
        return axiosInstance.post<LoginType>(`/auth/login`, { email, password, rememberMe, captcha }).then(res => res.data);
    },
    logout() {
        return axiosInstance.delete<LogOutType>(`/auth/login`).then(res => res.data);
    }
}
//done
type securityAPIType = {
    url: string
}
export const securityAPI = {
    getCaptcha(){
        return axiosInstance.get<securityAPIType>(`/security/get-captcha-url`).then(res => res.data);
    }
}

type updateStatusType ={
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
type saveProfileType ={
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}

export const profileAPI = {
    getProfile(userId: number| null) {
        return axiosInstance.get<ProfileType>(`/profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number| null) {
        return axiosInstance.get<any>(`/profile/status/` + userId).then(res => res.data);//no types is API DOCS
    },
    updateStatus(status: string) {
        return axiosInstance.put<updateStatusType>(`/profile/status`, { status: status }).then(res => res.data);
    },
    savePhoto(photoFile: any){
        const formData = new FormData();
        formData.append("image", photoFile);

        return axiosInstance.put(`/profile/photo`, formData, {headers: 
            {"Content-Type": 'multipart/form-data'}} ).then(res => res.data);
    },

    saveProfile(profile: ProfileType){
        return axiosInstance.put<saveProfileType>(`/profile`, profile).then(res => res.data);
    }
}

