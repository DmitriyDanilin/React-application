import { usersAPI } from "../API/users-api";
import { updateObjectInArray } from "../Utilits/helpers/object-helper";
import { UserType } from "../types/types"
import { AppStateType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ResponseType } from "../API/api";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [] as Array<number>,
    filter:{
        term: "",
        friend: null as null | boolean
    }
};

export type initialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }

        case 'SET_USERS':
            return { ...state, users: action.users }

        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SET_TOTAL_USERS_COUNT':
            return { ...state, totalUsersCount: action.totalCount }
        case 'TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgress
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(id => id != action.userId)
            }
        case 'SET_FILTER':
            return{...state, filter: action.payload}
        default:
            return state;
    }
}
// ACs
type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    setFilter: (filter: FilterType) => { return { type: 'SET_FILTER', payload: filter } as const },
    followSuccess: (userId: number) => { return { type: 'FOLLOW', userId } as const },
    unfollowSuccess: (userId: number) => { return { type: 'UNFOLLOW', userId } as const },
    setUsers: (users: Array<UserType>) => { return { type: 'SET_USERS', users } as const },
    setCurrentPage: (currentPage: number) => { return { type: 'SET_CURRENT_PAGE', currentPage } as const },
    setTotalUsersCount: (totalCount: number) => { return { type: 'SET_TOTAL_USERS_COUNT', totalCount } as const },
    setIsFetching: (isFetching: boolean) => { return { type: 'TOGGLE_IS_FETCHING', isFetching } as const },
    toggleIsFollowing: (isFollowingInProgress: boolean, userId: number) => { return { type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFollowingInProgress, userId } as const }
}


//thunks
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getUsers = (currentPage: number, pageSize: number, filter: FilterType):
    ThunkType =>
    async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);

        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.setIsFetching(false));
    }


export const getUsersOnPageClick = (currentPage: number, pageSize: number):
    ThunkType => async (dispatch) => {
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setIsFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setIsFetching(false));
    }

const followUnfollowFlow = async (dispatch: DispatchType, id: number,
    apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (id: number) => ActionsType) => {
    dispatch(actions.toggleIsFollowing(true, id));
    let response = await apiMethod(id);

    if (response.resultCode == 0) {
        dispatch(actionCreator(id))
    }
    dispatch(actions.toggleIsFollowing(false, id));
}

export const follow = (id: number): ThunkType => async (dispatch) => {
    let apiMethod = usersAPI.Follow.bind(id);
    await followUnfollowFlow(dispatch, id, apiMethod, actions.followSuccess);
}

export const unfollow = (id: number): ThunkType => async (dispatch) => {
    let apiMethod = usersAPI.unFollow.bind(id);
    await followUnfollowFlow(dispatch, id, apiMethod, actions.unfollowSuccess);
}



export default usersReducer;