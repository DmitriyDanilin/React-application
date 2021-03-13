import React, { Component } from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { saveProfile, getUserProfile, getStatus, updateStatus, savePhoto } from "../../redux/profile-reducer";
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

    setUserProfile = () => {
        let userId = this.props.match.params.userID
        if (!userId) {
            userId = this.props.loginedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.setUserProfile();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
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

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        loginedUserId: state.auth.userID,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, { saveProfile, getUserProfile, getStatus, updateStatus, savePhoto }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
