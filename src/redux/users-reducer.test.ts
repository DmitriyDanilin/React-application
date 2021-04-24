import usersReducer, { actions, initialStateType } from "./users-reducer"

let initialState:initialStateType;

beforeEach(()=>{
    initialState = {
        users: [
            {id: 0, name: "1", followed: false, 
            photos: {small: null, large: null}, 
            status: "stat1"},
            {id: 1, name: "2", followed: true, 
            photos: {small: null, large: null}, 
            status: "stat2"},
            {id: 2, name: "2", followed: true, 
            photos: {small: null, large: null}, 
            status: "stat3"},
            {id: 3, name: "2", followed: false, 
            photos: {small: null, large: null}, 
            status: "stat4"}
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        isFollowingInProgress: []
        }
})

test('follow Success ', () => {

    const newState = usersReducer(initialState, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow Success ', () => {

    const newState = usersReducer(initialState, actions.unfollowSuccess(2))

    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
