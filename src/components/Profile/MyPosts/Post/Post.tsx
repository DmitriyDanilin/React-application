import React from 'react';
import s from './Post.module.css';
import userPhoto from 'D:\\Git Rep\\React-application\\src\\img\\36b78c8b7cd957e082f53148b74787ea.jpg';
type PropsType={
  likesCount: number
  message: string
}
const Post: React.FC<PropsType> = (props) => {
  const [likes, setLike] = React.useState(props.likesCount);
  const putLike = () => {
    if (likes == props.likesCount ) {
      setLike(likes + 1);
    }
    else if(likes > props.likesCount)
    {
      setLike(likes - 1);
    }
  }
  return (
    <div className={s.item}>
      <img className={s.profilePH} src={userPhoto} />
      <span className={s.postText}>{props.message}</span>
      <div>
        <span onClick={putLike}><img className={s.like} src={"https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png"}></img></span>
         <span className={s.likesCount}>{likes}</span>
      </div>
    </div>
  )
}

export default Post;