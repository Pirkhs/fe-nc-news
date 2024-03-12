import '../styles/ArticleCard.css'
import { Link } from 'react-router-dom'

export default function ArticleCard ({article}) {
    return (
        <>
        <div className="article-card">
            <p> {article.author}  </p>
            <Link to={`/articles/${article.article_id}`}> 
                <h4> {article.title} </h4>
            </Link>
            <img src={article.article_img_url} alt={article.title}/> 
            <p className="article-card-topic"> {article.topic[0].toUpperCase() + article.topic.slice(1)} </p>
            <br></br>
            <p className="vote-count"> Votes: {article.votes }  </p>
            
        </div>
        </>
    )
}