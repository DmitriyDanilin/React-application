import React, { Component } from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userID
        if (!userId) {
            userId = this.props.loginedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);

    }
 
    render() {
        return (
            <Profile {...this.props}
                profile={this.props.profile}
                status={this.props.status} 
                updateStatus={this.props.updateStatus}/>
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
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
