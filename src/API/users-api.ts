import { UserType } from "../types/types"
import { axiosInstance, ResponseType } from "./api"

type getUsersType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
 }

//done
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = "", friend: null | boolean = null) {
        return axiosInstance.get<getUsersType>(`/users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend ===null ? "": `&friend=${friend}`))
        .then(response => { return response.data })
    },
    Follow(id: number) {
        return axiosInstance.post<Promise<ResponseType>>(`/follow/${id}`).then(response => { return response.data })
    },
    unFollow(id: number) {
        return axiosInstance.delete<Promise<ResponseType>>(`/follow/${id}`).then(response => { return response.data })
    }
}