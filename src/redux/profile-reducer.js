import { profileAPI, usersAPI } from "../API/api";
import { stopSubmit } from "redux-form";

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
    ],
    status: '',
    profile: null
};

const profileReducer = (state = initialState, action) => {

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
            return { ...state, profile: { ...state.profile, photos: action.photo } }

        }
        default:
            return state;
    }
}


export const addPostActionCreator = (newPostBody) => ({ type: ADD_POST, newPostBody })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatusAC = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postID) => ({ type: DELETE_POST, postID })
export const setUserPhoto = (photo) => ({ type: SET_PHOTO, photo })

export const getUserProfile = (userId) => async (dispatch) => {

    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatusAC(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    try{
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setUserStatusAC(status));
        }
    }
    catch(error){
        
    }
    
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(setUserPhoto(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const response = await profileAPI.saveProfile(profile)
    const userId = getState().auth.userID;

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;