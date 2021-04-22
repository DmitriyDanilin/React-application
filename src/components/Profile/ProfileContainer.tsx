import React, { Component } from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { saveProfile, getUserProfile, getStatus, updateStatus, savePhoto } from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    saveProfile:(profile: ProfileType) => Promise<any>
    getUserProfile:(id: number | null) => void
    getStatus:(id: number | null) => void
    updateStatus:(status: string) => void
    savePhoto:(file: File) => void
}
type PathParamsType ={
    userID: string
}
type WithRouterProps = RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<MapPropsType & DispatchPropsType & WithRouterProps> {

    setUserProfile = () => {
        let userId: number | null = +this.props.match.params.userID
        if (!userId) {
            userId = this.props.loginedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId );
        this.props.getStatus(userId );
    }

    componentDidMount() {
        this.setUserProfile();

    }
    componentDidUpdate(prevProps :MapPropsType & DispatchPropsType & WithRouterProps) {
        if (this.props.match.params.userID != prevProps.match.params.userID) {
            this.setUserProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userID}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto} 
                saveProfile ={this.props.saveProfile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        loginedUserId: state.auth.userID,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { saveProfile, getUserProfile, getStatus, updateStatus, savePhoto }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
