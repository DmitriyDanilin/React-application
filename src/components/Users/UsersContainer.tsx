import { connect } from 'react-redux'
import { getUsersOnPageClick, follow, unfollow, getUsers } from '../../redux/users-reducer'
import Users from './Users'
import React, { Component } from 'react'
import Preloader from '../Preloader/Preloader'
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { compose } from 'redux'
import { GetIsFollowingInProgress,
    GetIsFetching, 
    GetCurrentPage, 
    GetPageSize, 
    GetUsers, 
    GetTotalUsersCount 
} from '../../redux/users-selectors'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
    isFetching: boolean
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFollowingInProgress: Array<number>
    users: Array<UserType>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize:number) => void
    getUsersOnPageClick: (page: number, pageSize: number) => void
}
type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize } = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageClick = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsersOnPageClick(pageNumber, pageSize)
    }

    render() {
        return (<> 
            {this.props.isFetching ? <Preloader /> :
                <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageClick={this.onPageClick}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    users={this.props.users}
                    isFollowingInProgress={this.props.isFollowingInProgress}
                />}

        </>
        )
    }
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: GetUsers(state),
        pageSize: GetPageSize(state),
        totalUsersCount: GetTotalUsersCount(state),
        currentPage: GetCurrentPage(state),
        isFetching: GetIsFetching(state),
        isFollowingInProgress: GetIsFollowingInProgress(state)
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, {
        follow,
        unfollow,
        //toggleIsFollowing,
        getUsers,
        getUsersOnPageClick
    }),
    withAuthRedirect
)(UsersContainer)
