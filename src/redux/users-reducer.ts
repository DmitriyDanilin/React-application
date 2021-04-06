import { usersAPI } from "../API/api";
import { updateObjectInArray } from "../Utilits/helpers/object-helper";
import { UserType } from "../types/types"

const UNFOLLOW = 'UNFOLLOW';
const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: [] as Array<number>
};

type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: followSuccessActionType | unfollowSuccessActionType 
    | setUsersActionType | setCurrentPageActionType | setTotalUsersCountActionType | setIsFetchingActionType
    | toggleIsFollowingActionType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true } )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false } )
            }
            
        case SET_USERS:
            return { ...state, users: action.users }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalCount }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgress
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}
// ACs
type followSuccessActionType ={
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number):followSuccessActionType => { return { type: FOLLOW, userId } }

type unfollowSuccessActionType ={
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccessActionType => { return { type: UNFOLLOW, userId } }

type setUsersActionType ={
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): setUsersActionType => { return { type: SET_USERS, users } }

type setCurrentPageActionType ={
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => { return { type: SET_CURRENT_PAGE, currentPage } }

type setTotalUsersCountActionType ={
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): setTotalUsersCountActionType => { return { type: SET_TOTAL_USERS_COUNT, totalCount } }

type setIsFetchingActionType ={
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): setIsFetchingActionType => { return { type: TOGGLE_IS_FETCHING, isFetching } }

type toggleIsFollowingActionType ={
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFollowingInProgress: boolean
    userId: number
}
export const toggleIsFollowing = (isFollowingInProgress: boolean, userId: number): toggleIsFollowingActionType => { return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowingInProgress, userId } }

//thunks
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setIsFetching(true));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setIsFetching(false));
}


export const getUsersOnPageClick = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    dispatch(setUsers(data.items));
    dispatch(setIsFetching(false));
}

const followUnfollowFlow = async (dispatch: any, id: number, apiMethod: any, actionCreator: any) =>{
    dispatch(toggleIsFollowing(true, id));
    let data = await apiMethod(id);
    if (data.resultCode == 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleIsFollowing(false, id));
}

export const follow = (id: number) => async (dispatch: any) => {
    let apiMethod = usersAPI.Follow.bind(id);
    followUnfollowFlow(dispatch, id, apiMethod, followSuccess);
}

export const unfollow = (id: number) => async (dispatch: any) => {
    let apiMethod = usersAPI.unFollow.bind(id);
    followUnfollowFlow(dispatch, id, apiMethod, unfollowSuccess);
}



export default usersReducer;