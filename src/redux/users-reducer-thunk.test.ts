import { ResponseType, ResultCodeEnum } from "../API/api"
import { usersAPI } from '../API/users-api'
import { follow } from "./users-reducer"

jest.mock('../API/users-api') // we creating fake API method with expected result
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType ={
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

usersAPIMock.Follow.mockReturnValue(Promise.resolve(result))

test(' ', async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()
    const GetState = jest.fn()
    
    await thunk(dispatchMock, GetState, {})

    expect(dispatchMock).toBeCalledTimes(3)
})
