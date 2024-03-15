import '../styles/ArticleCard.css'
import { Link } from 'react-router-dom'

export default function ArticleCard ({article}) {
    return (
        <>
        <div className="article-card">
            <p> Author: {article.author}  </p>
            <br></br>
            <Link to={`/articles/${article.article_id}`} style={{color:"white", textDecoration:"none"}}> 
                <h4> {article.title} </h4>
            </Link>
            <img src={article.article_img_url} alt={article.title}/> 
            <p className="article-card-topic"> Topic: {article.topic[0].toUpperCase() + article.topic.slice(1)} </p>
            <p className="vote-count"> Votes: {article.votes }  </p>
            
        </div>
        </>
    )
}