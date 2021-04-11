import React from 'react'
import User from './User'
import { Pagination } from 'antd'
import s from './Users.module.css'
import { UserType } from '../../types/types'

type PropsType = {
    onPageClick: (pageNumber: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
    isFollowingInProgress: Array<number>
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({ onPageClick, currentPage, totalUsersCount, pageSize, isFollowingInProgress, ...props }) => {
    return (
        <div>
            <Pagination showSizeChanger={false} pageSize={pageSize} current={currentPage}
                responsive={true} size="default"
                onChange={onPageClick} total={totalUsersCount} />
            {
                props.users.map(u => <User user={u}
                    isFollowingInProgress={isFollowingInProgress}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    key={u.id} />)
            }
        </div >
    )
}

export default Users