import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { TextArea } from '../../common/FormControls/FormControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { maxLengthCreator } from "D:\\Git Rep\\React-application\\src\\Utilits\\Validators\\validators"
import { CreateField} from '../../common/FormControls/FormControls'
import { PostType } from '../../../types/types';

const maxLenght = maxLengthCreator(1000);

export type MapMyPostsPropsType ={
    
    posts: Array<PostType>
}

export type DispatchPropsType ={
    addPost: (newPostBody:string) => void
}
type AddPostFormValuesType={
    newPostBody: string
}

const MyPosts: React.FC<MapMyPostsPropsType & DispatchPropsType> = React.memo((props) => {
    let postsElements =
        [...props.posts].reverse().map(p => <Post key={p.message} message={p.message} likesCount={p.likesCount} />);


    let addNewPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostBody);
        values.newPostBody = ""
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <p>Write down the post:</p>
                <ReduxAddNewPostForm onSubmit={addNewPost} />
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})
type AddNewPostFormPropsType ={}
type PostFormPropertiesType = Extract< keyof PostFormType, string>
type PostFormType ={
    newPostBody: string
}
const AddNewPostForm: React.FC<InjectedFormProps<PostFormType, AddNewPostFormPropsType> & AddNewPostFormPropsType> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div className={s.addPostArea}>
            {CreateField<PostFormPropertiesType>("New Post", "newPostBody", [], TextArea)}
        </div>
        <button className={s.addPostBTN}>Add post</button>
    </form>
    )
}

const ReduxAddNewPostForm = reduxForm<PostFormType, AddNewPostFormPropsType>({ form: "addPost" })(AddNewPostForm)


export default MyPosts;