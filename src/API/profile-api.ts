import { axiosInstance, ResponseType, ResultCodeEnum } from "./api";
import { PhotosType, ProfileType } from '../types/types';

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number| null) {
        return axiosInstance.get<ProfileType>(`/profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number| null) {
        return axiosInstance.get<string>(`/profile/status/` + userId).then(res => res.data);//no types is API DOCS
    },
    updateStatus(status: string) {
        return axiosInstance.put<ResponseType>(`/profile/status`, { status: status }).then(res => res.data);
    },
    savePhoto(photoFile: any){
        const formData = new FormData();
        formData.append("image", photoFile);

        return axiosInstance.put<ResponseType<SavePhotoResponseType>>(`/profile/photo`, formData, {headers: 
            {"Content-Type": 'multipart/form-data'}} ).then(res => res.data);
    },

    saveProfile(profile: ProfileType){
        return axiosInstance.put<ResponseType>(`/profile`, profile).then(res => res.data);
    }
}