import {createSelector} from "reselect";
import { AppStateType } from "./redux-store";

const GetUsersSelector = (state: AppStateType)=>{
    return state.usersPage.users;
}

export const GetUsers= createSelector( GetUsersSelector, (users) =>{
    return users.filter(u => true);
})

export const GetPageSize = (state: AppStateType)=>{
    return state.usersPage.pageSize;
}

export const GetTotalUsersCount = (state: AppStateType)=>{
    return  state.usersPage.totalUsersCount;
}
export const GetCurrentPage = (state: AppStateType)=>{
    return  state.usersPage.currentPage;
}
export const GetIsFetching = (state: AppStateType)=>{
    return state.usersPage.isFetching;
}
export const GetIsFollowingInProgress = (state: AppStateType)=>{
    return state.usersPage.isFollowingInProgress;
}
export const  GetUsersFilter = (state: AppStateType) =>{
    return state.usersPage.filter;
}
