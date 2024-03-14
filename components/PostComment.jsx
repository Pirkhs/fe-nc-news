import { useContext, useState } from "react"
import UserContext from "./User"
import '../styles/PostComment.css'
import { postComment } from "../src/api"
import Error from "./Error"

export default function PostComment ({article_id, comments, handleCommentState}) {
    const [commentBody, setCommentBody] = useState("")
    const {loggedInUser} = useContext(UserContext)
    const [error, setError] = useState("")

    const handleCommentSubmit = (e) => {

        e.preventDefault()
        const commentBody = e.target["comment-body"].value
        postComment(article_id, loggedInUser.username, commentBody)
        .then(({data: {comment}}) => {
            handleCommentState([comment, ...comments])
        })
        .catch(err => setError("400: Bad Request"))  

        setCommentBody("")
    }

    return error? ( <Error msg={error}/> ) : (
        <form onSubmit={(e) => handleCommentSubmit(e)} className="post-comment"> 
        <h5> Post a Comment</h5>
            <label id="comment-username"> Username: <i>{loggedInUser.username}</i> </label>
            <br></br>

            <label id="comment-body"> Comment Body: </label>
            <br></br>
            <textarea id="comment-body" type="text" value={commentBody} onChange={(e) => setCommentBody(e.target.value)}></textarea>
            <br></br>

            <button type="submit"> Post </button>
        </form> 

    )
}