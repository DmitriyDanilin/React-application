import React from 'react';
import s from './Header.module.css';
import { NavLink } from "react-router-dom";
import { Button, Radio } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { GetIsAuth, GetLogin } from '../../redux/users-selectors';
import { logout } from '../../redux/auth-reduser';



const AppHeader: React.FC = (props) => {
    const isAuth = useSelector(GetIsAuth)
    const login = useSelector(GetLogin)
    const dispatch = useDispatch()

    const logoutCB =() =>{
        dispatch(logout())
    }
    return <Header className="site-layout-background" style={{ padding: 0 }}>
                  
                    
        <NavLink to="/profile" activeClassName={s.activeLink}>
            
        </NavLink>
        <span className={s.title}>FakeTelegram</span>
        <div className={s.loginBlock}>  {isAuth 
        ? 
        <div> <NavLink to="/login"><span>{login}</span></NavLink>  <NavLink to="/login">
            <Button onClick={logoutCB} danger ={true} type="primary">Log Out</Button>
            </NavLink></div>  
        : 
        <span className={s.login}>Log In</span>}</div>

    </Header>
    
}

export default AppHeader;