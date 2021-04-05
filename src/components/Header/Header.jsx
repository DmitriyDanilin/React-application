import React from 'react';
import s from './Header.module.css';
import { NavLink } from "react-router-dom";
import { Button, Radio } from 'antd';

const Header = (props) => {
    return <header className={s.header}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
            <img src='https://www.vectorlogo.zone/logos/telegram/telegram-tile.svg' />
        </NavLink>
        <span className={s.title}>FakeTelegram</span>
        <div className={s.loginBlock}>  {props.isAuth 
        ? 
        <div> <NavLink to="/login"><span>{props.login}</span></NavLink>  <NavLink to="/login">
            <Button onClick={props.logout} danger ={true} type="primary">Log Out</Button>
            </NavLink></div>  
        : 
        <span classNam={s.login}>Log In</span>}</div>
    </header>
}

export default Header;