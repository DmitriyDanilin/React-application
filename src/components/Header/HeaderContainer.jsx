import React, { Component } from 'react'
import Header from './Header';
import { logout } from '../../redux/auth-reduser';
import { connect } from 'react-redux'


class HeaderContainer extends React.Component {
    componentDidMount() {


    }
    render() {
        return <Header {...this.props} />
    }

}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, { logout })(HeaderContainer);