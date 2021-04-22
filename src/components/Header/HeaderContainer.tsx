import React, { Component } from 'react'
import Header from './Header';
import { logout } from '../../redux/auth-reduser';
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store';
import {MapPropsType, DispatchPropsType} from './Header'

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {


    }
    render() {
        return <Header {...this.props} />
    }

}

let mapStateToProps = (state:AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType >(mapStateToProps, { logout })(HeaderContainer);