import '../styles/ArticleCard.css'

export default function ArticleCard ({article}) {
    console.log(article)
    return (
        <div className="article-card">
            <p> {article.author}  </p>
            <h4> {article.title} </h4>
            <img src={article.article_img_url}/> 
            <p className="article-card-topic"> {article.topic[0].toUpperCase() + article.topic.slice(1)} </p>
            <br></br>
            <button className="article-card-votes"> Votes ⬆️ : {article.votes} </button>
            
        </div>
    )
}