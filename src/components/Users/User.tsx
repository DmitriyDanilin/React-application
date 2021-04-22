import React from 'react'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import s from './Users.module.css'
import userPhoto from 'D:\\Git Rep\\React-application\\src\\img\\UserPhoto.png'

type PropsType ={
    user: UserType
    isFollowingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
const User: React.FC<PropsType> = ({ user, isFollowingInProgress,unfollow, follow }) => {
    return (
        <div>
            <div className={s.users}>
                <div>
                    <div>
                        <NavLink to={"/profile/" + user.id}>
                            <img className={s.avatar} src={user.photos.small != null ? user.photos.small : userPhoto}></img>
                        </NavLink>
                    </div>
                    <div>{user.followed
                        ? <button disabled={isFollowingInProgress
                            .some(id => id === user.id)} className={s.followBTN} onClick={() => {
                                unfollow(user.id);
                            }} >Unfollow</button>
                        : <button disabled={isFollowingInProgress
                            .some(id => id === user.id)} className={s.followBTN} onClick={() => {
                                follow(user.id);
                            }}>Follow</button>}
                    </div>
                </div>

                <div className={s.userInfo}>
                    <span className={s.aboutUser}>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>

                    <span className={s.location}>
                        <div>country</div>
                        <div>city</div>
                    </span>

                </div>
            </div>

        </div >
    )
}

export default User