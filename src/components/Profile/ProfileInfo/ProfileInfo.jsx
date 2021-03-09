import React, { useState } from 'react';
import Preloader from '../../Preloader/Preloader';
import ProfileDataForm from './ProfileDataForm';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from 'D:\\Git Rep\\React-application\\src\\img\\36b78c8b7cd957e082f53148b74787ea.jpg';

const ProfileInfo = (props) => {
    const onAvatarSelected = (e) => {
        let file = e.target.files[0];
        props.savePhoto(file);
    }
    const onSubmit =  (formData) => {
        props.saveProfile(formData).then(()=>{
            setEditMode(false);

        })
    }
    let [editMode, setEditMode] = useState(false);
    if (!props.profile) {
        return <Preloader />
    }
    else {
        return (
            <div>
                <div className={s.descriptionBlock}>
                    <img className={s.avatar} src={props.profile.photos.large || userPhoto} ></img>
                    <div>{props.isOwner
                        ? <input type="file" onChange={onAvatarSelected} />
                        : ""}</div>
                    <div className={s.status}><ProfileStatusWithHooks status={props.status}
                        updateStatus={props.updateStatus} /></div>
                    {editMode ? <ProfileDataForm profile={props.profile} initialValues={props.profile} onSubmit={onSubmit} profile={props.profile} /> : <ProfileData
                        activateEditMode={() => { setEditMode(true) }}
                        profile={props.profile}
                        isOwner={props.isOwner} />}

                </div>
            </div>
        )
    }

}
const ProfileData = ({ profile, isOwner, activateEditMode }) => {
    return <div>
        <p className={s.profileName}>{profile.fullName}</p>
        <p><b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}</p>
        <p>{profile.lookingForAJobDescription}</p>
        <p><b>About me:</b> {profile.aboutMe}</p>
        {<div>
            <b>Contacts:</b> {Object.keys(profile.contacts)
                .map(key => {
                    return <Contact key={key} Title={key} Value={profile.contacts[key]} />
                })}
        </div>}
        {isOwner ? <div className={s.editBTN}>
            <button onClick={activateEditMode}>Edit</button>
        </div> : null}
    </div>
}

export const Contact = ({ Title, Value }) => {
    return <div className={s.contact}><b>{Title}:</b>{Value}</div>
}

export default ProfileInfo;