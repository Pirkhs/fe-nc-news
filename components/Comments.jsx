import { getCommentsByArticleId } from '../src/api'
import '../styles/Comments.css'
import { useState, useEffect } from 'react'
import Loading from './Loading'
import CommentCard from '../components/CommentCard'

export default function Comments ({article_id}) {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(article_id).then(({data: {comments}}) => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [])

    return isLoading ? <Loading/> : 
    (
        <div className="comments">
            <h4> Comments </h4>
            {comments.map(comment => {
                return <CommentCard key={comment.comment_id} comment = {comment}/>
            })}
        </div>
    )
}