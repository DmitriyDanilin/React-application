import { profileAPI } from "../API/profile-api";
import { usersAPI } from "../API/users-api";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types"
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ] as Array<PostType>, 
    status: "",
    profile: null as ProfileType | null
};

export type initialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case 'ADD_POST': {
            let newPostID = state.posts.length;
            let newPost = {
                id: newPostID,
                message: action.newPostBody,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case 'SET_USER_PROFILE': {

            return {
                ...state,
                profile: action.profile
            };

        }
        case 'DELETE_POST': {

            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postID)
            };

        }
        case 'SET_STATUS': {

            return {
                ...state,
                status: action.status
            };

        }
        case 'SET_PHOTO': {
            return { ...state, profile: { ...state.profile, photos: action.photo } as ProfileType}

        }
        default:
            return state;
    }
}

//ACs
export const actions = {
    addPostActionCreator: (newPostBody: string) => ({ type: 'ADD_POST', newPostBody }as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile }as const),
    setUserStatusAC: (status: string) => ({ type: 'SET_STATUS', status }as const),
    deletePost: (postID: number)  => ({ type: 'DELETE_POST', postID }as const),
    setUserPhoto: (photo: PhotosType) => ({ type: 'SET_PHOTO', photo }as const)
}


//thunks

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType | ReturnType<typeof stopSubmit>>

export const getUserProfile = (userId: number | null):ThunksType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
}

export const getStatus = (userId: number):ThunksType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatusAC(response));
}

export const updateStatus = (status: string):ThunksType => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status)

        if (response.resultCode === 0) {
            dispatch(actions.setUserStatusAC(status));
        }
    }
    catch (error) {

    }

}
export const savePhoto = (file: File):ThunksType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.resultCode === 0) {
        dispatch(actions.setUserPhoto(response.data.photos));
    }
}

export const saveProfile = (profile: ProfileType):ThunksType => async (dispatch, getState) => {
    const response = await profileAPI.saveProfile(profile)
    const userId = getState().auth.userID;

    if (response.resultCode === 0) {
        if(userId === null) 
        {
            dispatch(getUserProfile(userId));
        }
        else{
            throw new Error("User id is NULL!")
        }
    } else {
        dispatch(stopSubmit("edit-profile", { _error: response.messages[0] }));
        return Promise.reject(response.messages[0]);
    }
}

export default profileReducer;