import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initilizeApp } from './redux/app-reduser';
import Preloader from './components/Preloader/Preloader';
import DialogsContainer from "./components/Dialogs/DialogsContainer";



class App extends React.Component {
    catchAllUnhandledErrors = (promiseRejectionEvent)=>{
        alert("Some error");
    }
    componentDidMount() {
        this.props.initilizeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);

    }
    componentWillUnmount(){
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.isInitialized) {
            return <Preloader />
        }
        return (
            
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Switch>
                    <Redirect exact from="/" to="/profile" />
                        <Route path='/dialogs'
                            render={() => {
                                return <DialogsContainer />
                            }} />

                        <Route path='/profile/:userID?'
                            render={() => <ProfileContainer />} />

                        <Route path='/users'
                            render={() => <UsersContainer pageTitle={"Users"}/>} />
                        <Route path='/login'
                            render={() => <Login />} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized
})
export default compose(
    withRouter,
    connect(mapStateToProps, { initilizeApp })
)(App);