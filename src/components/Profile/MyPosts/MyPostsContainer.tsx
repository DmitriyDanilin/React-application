import React from 'react';
import { actions } from "../../../redux/profile-reducer";
import MyPosts, { DispatchPropsType } from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from '../../../redux/redux-store';
import {MapMyPostsPropsType} from '../MyPosts/MyPosts'

const mapStateToProps = (state : AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}




const MyPostsContainer = connect<MapMyPostsPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostActionCreator} )(MyPosts);

export default MyPostsContainer;