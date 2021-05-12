import React, {Suspense} from 'react';
import './App.css';
import { NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom";
import ProfileContainer from './components/Profile/ProfileContainer';
import { Login } from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initilizeApp } from './redux/app-reduser';
import Preloader from './components/Preloader/Preloader';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { AppStateType } from './redux/redux-store';
import { UsersPage } from './components/Users/UsersPage';
import { Layout, Menu } from 'antd';
import {
    TeamOutlined,
    UserOutlined,
    MailOutlined,
    WechatOutlined
} from '@ant-design/icons';
import AppHeader from './components/Header/Header';
import { ChatPage } from './pages/Chat/ChatPage';

//const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

const { Content, Footer, Sider } = Layout;


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initilizeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed: boolean) => {
        this.setState({ collapsed });
    };

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error");
    }
    componentDidMount() {
        this.props.initilizeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);

    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        const { collapsed } = this.state;
        if (!this.props.isInitialized) {
            return <Preloader />
        }
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div >< img className="logo" src='https://www.vectorlogo.zone/logos/telegram/telegram-tile.svg'></img></div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/profile"> My Profile</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<MailOutlined />}>
                            <NavLink to="/dialogs">Dialogs</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon= {<TeamOutlined />}>
                            <NavLink to="/users">Users</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4" icon= {<WechatOutlined />}>
                            <NavLink to="/chat">Chat</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                <AppHeader />
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <Redirect exact from="/" to="/profile" />
                            <Route path='/dialogs'
                                render={() => {
                                    return <DialogsContainer />
                                }} />

                            <Route path='/profile/:userID?'
                                render={() => <ProfileContainer />} />
                                <Route path='/React-application'
                                render={() => <ProfileContainer />} />

                            <Route path='/users'
                                render={() => <UsersPage />} />
                            <Route path='/login'
                                render={() => <Login />} />
                            <Route path='/chat'
                                render={() => <ChatPage /> } />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Fake Telegram 2021 created by Dmitriy Danilin</Footer>
                </Layout>
            </Layout>)
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isInitialized: state.app.isInitialized
})
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { initilizeApp })
)(App);