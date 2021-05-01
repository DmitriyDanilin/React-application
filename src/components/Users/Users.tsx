import React, { useEffect } from 'react'
import User from './User'
import { Pagination } from 'antd'
import { FilterType } from '../../redux/users-reducer'
import UsersSearchForm from './UserSearchForm'
import { GetCurrentPage, GetIsFetching, GetIsFollowingInProgress, GetPageSize, GetTotalUsersCount, GetUsers, GetUsersFilter } from '../../redux/users-selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, follow, unfollow } from '../../redux/users-reducer'
import Preloader from '../Preloader/Preloader'

type PropsType = {
}

const Users: React.FC<PropsType> = React.memo(() => {


    const totalUsersCount = useSelector(GetTotalUsersCount)
    const currentPage = useSelector(GetCurrentPage)
    const pageSize = useSelector(GetPageSize)
    const filter = useSelector(GetUsersFilter) 
    const users = useSelector(GetUsers)
    const isFollowingInProgress = useSelector(GetIsFollowingInProgress)
    const isFetching= useSelector(GetIsFetching)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    },[])

    const onPageClick = (pageNumber: number) =>{
        dispatch(getUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType)=>{
        dispatch(getUsers(1, pageSize, filter))
    }

    const Follow= (userId: number) => {
        dispatch(follow(userId))
    }
    const Unfollow =  (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div>
            { <Pagination showSizeChanger={false} pageSize={pageSize} current={currentPage}
                responsive={true} size="default"
                onChange={onPageClick} total={totalUsersCount} />}

            <UsersSearchForm onFilterChanged= {onFilterChanged}/>
            {
                users.map(u => <User user={u}
                    isFollowingInProgress={isFollowingInProgress}
                    follow={Follow}
                    unfollow={Unfollow}
                    key={u.id} />)
            }
        </div >
    )
})




export default Users