import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { AppStateType } from '../redux/redux-store';

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type MapPropsType = ReturnType<typeof mapStateToPropsForRedirect>
type DispatchPropsType ={

}

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {

    const AuthRedirect:React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!props.isAuth) return <Redirect to={"/login"} />;
        return (
            <Component {...restProps as WCP } />
        )
    }
    let ConnectedAuthRegirectComponent = connect<MapPropsType, DispatchPropsType,WCP, AppStateType>(mapStateToPropsForRedirect)(AuthRedirect)

    return ConnectedAuthRegirectComponent;
}
