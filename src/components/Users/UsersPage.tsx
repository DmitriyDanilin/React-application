import { useDispatch, useSelector } from 'react-redux'
import Users from './Users'
import React, { useEffect }  from 'react'
import Preloader from '../Preloader/Preloader'
import { GetCurrentPage, GetIsFetching, GetPageSize, GetTotalUsersCount, GetUsersFilter} from '../../redux/users-selectors'
import { getUsers} from '../../redux/users-reducer'

type UserPagePropsType = {

    
}

export const UsersPage: React.FC<UserPagePropsType> = (props) =>{
    const isFetching= useSelector(GetIsFetching)  

    return (<> 
        { 
            <Users/>}

    </>
    )
}
