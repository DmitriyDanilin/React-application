import React from 'react'
import User from './User'
import { Pagination } from 'antd'
import s from './Users.module.css'
import { UserType } from '../../types/types'
import { ErrorMessage, FieldArray, Form, Formik, Field } from 'formik'
import { FilterType } from '../../redux/users-reducer'

type PropsType = {
    onPageClick: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
    isFollowingInProgress: Array<number>
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<PropsType> = React.memo(({ onPageClick, currentPage, totalUsersCount, pageSize, isFollowingInProgress, ...props }) => {
    return (
        <div>
            <Pagination showSizeChanger={false} pageSize={pageSize} current={currentPage}
                responsive={true} size="default"
                onChange={onPageClick} total={totalUsersCount} />
            <UsersSearchForm onFilterChanged= {props.onFilterChanged}/>
            {
                props.users.map(u => <User user={u}
                    isFollowingInProgress={isFollowingInProgress}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    key={u.id} />)
            }
        </div >
    )
})




const UserSearchValidate = (values: any) => {

    const errors = {};

    return errors;

}
type FormType ={
    term: string
    friend: "true" | "false" | "null"
}
type UsersSearchFormPropsType ={
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm:React.FC<UsersSearchFormPropsType> = React.memo((props) => {

    const submit = (values: FormType, { setSubmitting }
        : { setSubmitting: (isSubmiting: boolean) => void }) => {
            const filter: FilterType = {term: values.term,
            
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false}
            props.onFilterChanged(filter);
    }

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: "null" }}
                validate={UserSearchValidate}
                onSubmit={submit}
            >
                {() => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name = "friend" as ="select">
                            <option value="null" >All</option>
                            <option value="true" >Only folowed</option>
                            <option value="false" >Only unfolowed</option>
                        </Field>
                        <button type="submit">
                            Search
           </button>
                    </Form>
                )}
            </Formik>
        </div >
    )
})
export default Users