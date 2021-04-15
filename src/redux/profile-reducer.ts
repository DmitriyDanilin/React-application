import { profileAPI, usersAPI } from "../API/api";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types"
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SET_PHOTO = 'SET_PHOTO'
const SET_PROFILE = 'SET_PROFILE'



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

type ActionsType = AddPostActionType 
| SetUserProfileActionType | SetUserStatusActionType 
| DeletePostActionType | SetUserPhotoActionType

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case ADD_POST: {
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
        case SET_USER_PROFILE: {

            return {
                ...state,
                profile: action.profile
            };

        }
        case DELETE_POST: {

            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postID)
            };

        }
        case SET_STATUS: {

            return {
                ...state,
                status: action.status
            };

        }
        case SET_PHOTO: {
            return { ...state, profile: { ...state.profile, photos: action.photo } as ProfileType}

        }
        default:
            return state;
    }
}

//ACs
type AddPostActionType = {
    type: typeof ADD_POST
    newPostBody: string
}
export const addPostActionCreator = (newPostBody: string): AddPostActionType => ({ type: ADD_POST, newPostBody })

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type SetUserStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setUserStatusAC = (status: string):SetUserStatusActionType => ({ type: SET_STATUS, status })

type DeletePostActionType = {
    type: typeof DELETE_POST
    postID: number
}
export const deletePost = (postID: number):DeletePostActionType  => ({ type: DELETE_POST, postID })

type SetUserPhotoActionType ={
    type: typeof SET_PHOTO
    photo: PhotosType
}
export const setUserPhoto = (photo: PhotosType): SetUserPhotoActionType => ({ type: SET_PHOTO, photo })



//thunks

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUserProfile = (userId: number | null):ThunksType => async (dispatch) => {
    //@ts-ignore //TODO: FIX userId type
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response));
}

export const getStatus = (userId: number):ThunksType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatusAC(response));
}

export const updateStatus = (status: string):ThunksType => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status)

        if (response.resultCode === 0) {
            dispatch(setUserStatusAC(status));
        }
    }
    catch (error) {

    }

}
export const savePhoto = (file: any):ThunksType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.photos));
    }
}

export const saveProfile = (profile: ProfileType):ThunksType => async (dispatch, getState) => {
    const response = await profileAPI.saveProfile(profile)
    const userId = getState().auth.userID;

    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        //@ts-ignore
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
        return Promise.reject(response.messages[0]);
    }
}

export default profileReducer;