import '../styles/SingleArticle.css'
import { useParams } from "react-router-dom"    
import { useEffect, useState } from "react";
import { getArticleById } from "../src/api";
import Loading from './Loading';

export default function SingleArticle () {
    const [article, setArticle] = useState({})
    const {article_id} = useParams();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id).then(({data: {article}}) => {
            setArticle(article)
            setIsLoading(false)
        })
    }, [])

    
    return isLoading ? ( <Loading/> ) :
     (
        <div className="single-article">
            <p> {article.author} </p>
            <h3> {article.title} </h3>
            <br></br>
            <p className="article-body"> {article.body}</p>
            <img src={article.article_img_url}></img>
            <br></br>
            <p className="article-card-topic"> Topic:  {article.topic} </p>
            <p> Created At: {article.created_at} </p>
            <br></br>
            <button className="article-card-votes"> Votes ⬆️ : {article.votes} </button>
            <p className="article_id"> Id: {article.article_id}  </p>
        </div>
    )
}