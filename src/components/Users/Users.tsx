import React, { useEffect } from 'react'
import User from './User'
import { Pagination } from 'antd'
import { FilterType } from '../../redux/users-reducer'
import UsersSearchForm from './UserSearchForm'
import { GetCurrentPage, GetIsFetching, GetIsFollowingInProgress, GetPageSize, GetTotalUsersCount, GetUsers, GetUsersFilter } from '../../redux/users-selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, follow, unfollow } from '../../redux/users-reducer'
import Preloader from '../Preloader/Preloader'
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'
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


    const history = useHistory();

    const dispatch = useDispatch();
    type QueryParamsType = {term?: string; page?: string; friend?: string}
   
    useEffect(() => {
        
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter 

        if (!!parsed.page) actualPage = +parsed.page
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend ==="null" ? null : parsed.friend === "true" ? true  : false}
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    },[])


    useEffect(() => {
        const query: QueryParamsType = {} 
        if(!!filter.term) query.term = filter.term
        if(!!filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push(
            {
                pathname: '/users',
                search: queryString.stringify(query)
            }
        )
    },[filter, currentPage])

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
            { <Pagination style={{ margin: '20px' }} showSizeChanger={false} pageSize={pageSize} current={currentPage}
                responsive={true} size="default"
                onChange={onPageClick} total={totalUsersCount} />}

            <UsersSearchForm onFilterChanged= {onFilterChanged}/>
            { isFetching ? <Preloader/> :
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