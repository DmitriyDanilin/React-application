import React from 'react';
import User from './User';
import { Pagination } from 'antd';
import s from './Users.module.css'



const Users = ({ onPageClick, currentPage, totalUsersCount, pageSize, isFollowingInProgress, follow, unfollow, ...props }) => {
    return (
        <div>
            <Pagination showSizeChanger ={false} pageSize={pageSize} current ={currentPage} 
            responsive ={true} size ="default" 
            onChange={onPageClick} total={totalUsersCount} />
            {
                props.users.map(u => <User user={u}
                    isFollowingInProgress = {isFollowingInProgress}
                    follow = {follow}
                    unfollow ={unfollow}
                     key={u.id}/> )
            }
        </div >
    )
}

export default Users