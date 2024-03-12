import '../styles/CommentCard.css'

export default function CommentCard ({comment}) {
    return (
        <div className="comment-card">
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