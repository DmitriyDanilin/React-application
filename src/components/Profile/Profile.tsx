import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { Redirect } from 'react-router-dom';
import { ProfileType } from '../../types/types';
type PropsType ={
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    saveProfile: (profile:ProfileType) => Promise<any>
    savePhoto: (file: File) => void
}
const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo
            isOwner ={props.isOwner}
            profile={props.profile} 
            status={props.status}
            updateStatus={props.updateStatus}
            savePhoto = {props.savePhoto} 
            saveProfile ={props.saveProfile}/>

            
            <MyPostsContainer />
        </div>
    )
}

export default Profile;