import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../../common/FormControls/FormControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import required, { maxLengthCreator } from "D:\\Git Rep\\React-application\\src\\Utilits\\Validators\\validators.ts"

const maxLenght = maxLengthCreator(1000);

const MyPosts = React.memo((props) => {
    let postsElements =
        [...props.posts].reverse().map(p => <Post key={p.message} message={p.message} likesCount={p.likesCount} />);


    let addNewPost = (values) => {
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

const AddNewPostForm = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div className={s.addPostArea}>
            <Field validate={[required, maxLenght]} placeholder="New Post" component={TextArea} name="newPostBody" />
        </div>
        <button className={s.addPostBTN}>Add post</button>
    </form>
    )
}

const ReduxAddNewPostForm = reduxForm({ form: "addPost" })(AddNewPostForm)


export default MyPosts;