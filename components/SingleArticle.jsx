import '../styles/SingleArticle.css'
import { useParams } from "react-router-dom"    
import { useEffect, useState } from "react";
import { getArticleById, incrementArticleVoteCount } from "../src/api";
import Loading from './Loading';
import Comments from './Comments';
import Error from './Error'

export default function SingleArticle () {
    const [article, setArticle] = useState({})
    const {article_id} = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [buttonClicked, setButtonClicked] = useState({})
    const [error, setError] = useState(null)

    const handleVote = (e) => {
        e.preventDefault()
        if (buttonClicked.className === "article-upvote") incrementVoteCount(1, e)
        else if (buttonClicked.className === "article-downvote") incrementVoteCount(-1, e)
    }

    const updateArticle = (currArticle, incVotes, isSuccess) => {
        const copyCurrArticle = {...currArticle}
        if (isSuccess) copyCurrArticle.votes = (article.votes + incVotes)
        else copyCurrArticle.votes = (article.votes)

        return copyCurrArticle
    }

    const incrementVoteCount = (incVotes, e) => {
        setArticle(currArticle => updateArticle(currArticle, incVotes, true))
        incrementArticleVoteCount(article_id, incVotes)
        .catch(err => {
            setArticle(currArticle => updateArticle(currArticle, incVotes, false))
        })
        
        if (buttonClicked.className === "article-upvote") {
            buttonClicked.classList.add("disabled")
            e.target.downvote.classList.remove("disabled")
        }

        else if (buttonClicked.className === "article-downvote") {
            buttonClicked.classList.add("disabled")
            e.target.upvote.classList.remove("disabled")
        }
    }
    

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id).then(({data: {article}}) => {
            setArticle(article)
            setIsLoading(false)
        })
        .catch(error => {
            setIsLoading(false)
            setError('404: Article id does not exist')
        } )
    }, [])

    if (error) return <Error msg={error}/>

    return isLoading ? ( <Loading/> ) :
     (
        <>
        
        <form onSubmit = {(e) => handleVote(e)} className="single-article">
            <p> {article.author} </p>
            <h3> {article.title} </h3>
            <br></br>
            <p className="article-body"> {article.body}</p>
            <img src={article.article_img_url} alt={article.title}></img>
            <br></br>
            <p className="article-card-topic"> Topic:  {article.topic} </p>
            <p> {Date(article.created_at).toString()} </p>
            <br></br>
            <button id="upvote" className="article-upvote" onClick = {(e) => setButtonClicked(e.target)}>   ⬆️   </button>
            <p className="vote-count">  {article.votes }  </p>
            <button id="downvote" className="article-downvote" onClick = {(e) => setButtonClicked(e.target)}>   ⬇️  </button>
            <p className="article_id"> Article Id: {article.article_id}  </p>
        </form>

        <br></br>
        <Comments article_id={article_id}/>
        </>
    )
}