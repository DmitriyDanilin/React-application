import React from 'react'
import s from './ProfileInfo.module.css';
import { CreateField, Input, TextArea } from '../../common/FormControls/FormControls';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { ProfileType } from '../../../types/types';
type PropsType ={
    profile: ProfileType
}
type ProfileTypeKeys = Extract< keyof ProfileType, string>
const ProfileDataForm: React.FC<InjectedFormProps< ProfileType,PropsType>&PropsType> = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>Full Name: {CreateField("Full name", "fullName", [], Input)}</div>
            <div>Looking for a job: <span className={s.lookingForAJob}>{CreateField<ProfileTypeKeys>("", "lookingForAJob", [], Input, "checkbox")}</span></div>
            <div>Looking for a job description: <span>{CreateField<ProfileTypeKeys>("Description", "lookingForAJobDescription", [], TextArea)}</span></div>
            <div>About me: <span>{CreateField<ProfileTypeKeys>("About me", "aboutMe", [], TextArea)}</span></div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contact}>
                        {key}:  {CreateField(key, "contacts." + key, [], Input)}
                    </div>
                })}
            </div>
            { error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <button>Save</button>
        </form>
    )
}

const ReduxProfileDataForm = reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm)
export default ReduxProfileDataForm