import React, { ChangeEvent, useState } from 'react';
import { ProfileType, ContactsType } from '../../../types/types';
import Preloader from '../../Preloader/Preloader';
import ProfileDataForm from './ProfileDataForm';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from 'D:\\Git Rep\\React-application\\src\\img\\UserPhoto.png';

type PropsType ={
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    saveProfile: (profile:ProfileType) => Promise<any>
    savePhoto: (file: File) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length){
            let file = e.target.files[0]
            props.savePhoto(file);
        }  
    }
    const onSubmit =  (formData: ProfileType) => {
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
                    {editMode ? <ProfileDataForm profile={props.profile} initialValues={props.profile} onSubmit={onSubmit}/> : 
                    <ProfileData
                        activateEditMode={() => { setEditMode(true) }}
                        profile={props.profile}
                        isOwner={props.isOwner} />}

                </div>
            </div>
        )
    }

}
type ProfileDataPropsType ={
    profile: ProfileType
    isOwner: boolean
    activateEditMode: ()=> void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, activateEditMode }) => {
    return <div>
        <p className={s.profileName}>{profile.fullName}</p>
        <p><b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}</p>
        <p>{profile.lookingForAJobDescription}</p>
        <p><b>About me:</b> {profile.aboutMe}</p>
        {<div> 
            <b>Contacts:</b> {Object.keys(profile.contacts)
                .map(key  => {
                    return <Contact key={key} Title={key} Value={profile.contacts[key as keyof ContactsType]} />
                })}
        </div>}
        {isOwner ? <div className={s.editBTN}>
            <button onClick={activateEditMode}>Edit</button>
        </div> : null}
    </div>
}
type ContactPropsType ={
    Title: string
    Value: string
}
export const Contact: React.FC<ContactPropsType> = ({ Title, Value }) => {
    return <div className={s.contact}><b>{Title}:</b>{Value}</div>
}

export default ProfileInfo;