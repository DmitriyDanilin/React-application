import axios from 'axios'

const axiosInstance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0',
        headers: { "API-KEY": "97132c0f-39d9-4230-aaf8-d365f7c03dce" }
    }
);

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return axiosInstance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response => { return response.data })
    },
    Follow(id) {
        return axiosInstance.post(`/follow/${id}`).then(response => { return response.data })
    },
    unFollow(id) {
        return axiosInstance.delete(`/follow/${id}`).then(response => { return response.data })
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}



export const authAPI = {
    authMe() {
        return axiosInstance.get(`/auth/me`);
    },
    login(email, password, rememberMe = false, captcha =null) {
        return axiosInstance.post(`/auth/login`, { email, password, rememberMe, captcha });
    },
    logout() {
        return axiosInstance.delete(`/auth/login`);
    }
}
export const securityAPI = {
    getCaptcha(){
        return axiosInstance.get(`/security/get-captcha-url`);
    }
}



export const profileAPI = {
    getProfile(userId) {
        return axiosInstance.get(`/profile/${userId}`)
    },
    getStatus(userId) {
        return axiosInstance.get(`/profile/status/` + userId);
    },
    updateStatus(status) {
        return axiosInstance.put(`/profile/status`, { status: status });
    },
    savePhoto(photoFile){
        const formData = new FormData();
        formData.append("image", photoFile);

        return axiosInstance.put(`/profile/photo`, formData, {headers: 
            {"Content-Type": 'multipart/form-data'}} )
    },
    saveProfile(profile){
        return axiosInstance.put(`/profile`, profile);
    }
}

