import '../styles/CommentCard.css'
import DeleteComment from './DeleteComment'
import UserContext from './User'
import { useContext } from 'react'

export default function CommentCard ({comment, comments, handleCommentState}) {

    const {loggedInUser: {username}} = useContext(UserContext)

    return (
        <div className="comment-card">
            {
                comment.author === username ? <DeleteComment comment_id={comment.comment_id} handleCommentState={handleCommentState}/> : <br></br>
            }
            <img src="../src/default-profile-icon.png" alt="A default profile icon"/>
            <p className="comment-author"> {comment.author} </p>
            <p> {comment.body} </p>
            <br></br>
            <button className="comment-card-upvote">   ⬆️   </button>
            <p className="vote-count">  {comment.votes }  </p>
            <button className="comment-card-downvote">   ⬇️  </button>
            <p className="comment-id"> Comment Id: {comment.comment_id}</p>
            <p> { Date(comment.created_at).toString()} </p>
            <br></br>

        </div>
    )
}