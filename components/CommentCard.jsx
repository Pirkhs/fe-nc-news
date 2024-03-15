import '../styles/CommentCard.css'
import DeleteComment from './DeleteComment'
import UserContext from './User'
import { useContext } from 'react'

export default function CommentCard ({comment, handleCommentState}) {

    const {loggedInUser: {username}} = useContext(UserContext)

    return (
        <div className="comment-card">
            {
                comment.author === username ? <DeleteComment comment_id={comment.comment_id} handleCommentState={handleCommentState}/> : <br></br>
            }
            <img src="https://i.postimg.cc/tTD8W59M/default-profile-icon.png" alt="A default profile icon"/>
            <p className="comment-author"> {comment.author} </p>
            <p> {comment.body} </p>
            <br></br>
            <p className="vote-count"> Votes: {comment.votes }  </p>
            <p className="comment-id"> Comment Id: {comment.comment_id}</p>
            <p> { Date(comment.created_at).toString()} </p>
            <br></br>

        </div>
    )
}