import { FilterType } from '../../redux/users-reducer'
import { ErrorMessage, FieldArray, Form, Formik, Field } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsersFilter } from '../../redux/users-selectors'

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
    const filter = useSelector(GetUsersFilter)

    const submit = (values: FormType, { setSubmitting }
        : { setSubmitting: (isSubmiting: boolean) => void }) => {
            const filter: FilterType = {term: values.term,
            
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false}
            props.onFilterChanged(filter);
    }

    return (
        <div>
            <Formik
                enableReinitialize ={true}
                initialValues={{ term: filter.term, friend: String(filter.friend) as "true" | "false" | "null" }}
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

export default UsersSearchForm