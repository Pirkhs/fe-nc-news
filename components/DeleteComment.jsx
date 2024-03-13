import '../styles/DeleteComment.css'
import { deleteComment } from '../src/api'
import Error from './Error'
import { useState } from 'react'

export default function DeleteComment ({comment_id, comments, handleCommentState}) {
    const [error, setError] = useState("")

    const handleDeleteComment = (e) => {
        deleteComment(comment_id)
        .then(() => handleCommentState(currComments => {
            const copyCurrComments = [...currComments]
            return copyCurrComments.filter(comment => comment.comment_id !== comment_id)
        }))
        .catch(err => setError("404: Not found"))
    }

    return error? (<Error msg={error}/>) : (
        <div className="delete-comment">
            <button onClick = {(e) => handleDeleteComment(e)}> Delete 🗑️ </button>
        </div>
    )
}