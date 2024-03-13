import '../styles/DeleteComment.css'
import { deleteComment } from '../src/api'
import Error from './Error'
import { useState, useEffect } from 'react'
import Loading from './Loading'

export default function DeleteComment ({comment_id, handleCommentState}) {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteComment = (e) => {
        setIsLoading(true)
        e.target.classList.add("disabled")
        deleteComment(comment_id)
        .then(() => handleCommentState(currComments => {
            const copyCurrComments = [...currComments]
            return copyCurrComments.filter(comment => comment.comment_id !== comment_id)
        }))
        .catch(err => {
            setError(err.message)
            setIsLoading(false)
        })
    }

    if (isLoading) return <Loading/>

    if (error) return  <Error msg={error}/>

    return (
        <div className="delete-comment">
            <button onClick = {(e) => handleDeleteComment(e)}> Delete 🗑️ </button>
        </div>
    )
}