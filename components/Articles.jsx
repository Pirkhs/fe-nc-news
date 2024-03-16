import { useState, useEffect } from 'react'
import { getAllTopics, getArticles} from '../src/api'
import ArticleCard from './ArticleCard'
import Loading from './Loading'
import Error from './Error'
import '../styles/Articles.css'
import { Link, useSearchParams } from 'react-router-dom'

export default function Articles () {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState(null)
    const [order, setOrder] = useState(null)
    const [error, setError] = useState(null)
    
    const [searchParams, setSearchParams] = useSearchParams();
    const topicQuery = searchParams.get("topic")  
    const sortQuery = searchParams.get("sort_by")
    const orderQuery = searchParams.get("order")
    
    const handleSortBy = (e) => {
        e.preventDefault()
        const newParams = new URLSearchParams(searchParams);
        newParams.set('order', order || "desc");
        newParams.set('sort_by', sortBy || "created_at")
        setSearchParams(newParams);
    }

    useEffect(() => {
        setIsLoading(true)
        getArticles(topicQuery).then(({data: {articles}}) => { 
            setArticles(articles)
            setIsLoading(false)
        })
    }, [topicQuery])

    useEffect(() => {
        setIsLoading(true)
        getAllTopics().then(({data: {topics}}) => {
            setTopics(topics)
        })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        if (sortQuery === "comment_count"){
            const orderMapper = {
                "asc": (a,b) => a.comment_count - b.comment_count,
                "desc": (a,b) => b.comment_count - a.comment_count
            }
            setArticles((currArticles)=> {
                const copyCurrArticles = [...currArticles]
                const sortedArticlesByCommentCount = copyCurrArticles.sort( orderMapper[order] )
                return sortedArticlesByCommentCount
            })
            setIsLoading(false)
            return
        }
        getArticles(topicQuery, sortQuery, orderQuery).then(({data: {articles}}) => {
            setArticles(articles)
            setIsLoading(false)
        })
        .catch(err => {
            setError(err.message)
        })
    }, [sortQuery, orderQuery])


    if (error) return <Error msg={error}/>

    return isLoading ? (
        <Loading/>
    ) : (
        <>
        <div className="filter-sort-msg"> 
        
        
        {topicQuery ? <p> Filtered by: {topicQuery} </p> : <p></p>}
        {sortQuery ? <p> {`Sorted by: ${sortQuery} - ${orderQuery}ending order`} </p> : <p></p>}

        </div>
        <div className="articles-page">
            <div className="articles">
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </div>
        <div className="fixed-sidebar">
            <ul className="filter-by-topics">
                <h3> TOPICS </h3>
                <br></br>
                {topics.map(topic => {
                    return (
                        <div key={topic.slug} className="topic"> 
                            <p> <Link  to={`/articles/?topic=${topic.slug}`} style={{color:"white", textDecoration:"none"}}> {topic.slug[0].toUpperCase() + topic.slug.slice(1)}</Link> </p>
                        </div>
                    )
                })}
                <br></br>
            </ul>
            <form className="sort-by" onSubmit = {(e) => handleSortBy(e)}>
                <h3 style={{color:"rgb(146, 146, 146)"}}> SORT BY </h3>
                
                <input type="radio" id="date" name="sort-by" onChange={() => setSortBy("created_at")}></input>
                <label htmlFor="date"> Date </label>
                <br></br>
                <input type="radio" id="comment_count" name="sort-by" onChange={() => setSortBy("comment_count")} ></input>
                <label htmlFor="comment_count"> Comment Count </label>
                <br></br>
                <input type="radio" id="votes" name="sort-by" onChange={() => setSortBy("votes")} ></input>
                <label htmlFor="Votes"> Votes </label>
                <br></br>
                
                <br></br>
                <h3 style={{color:"rgb(146, 146, 146)"}}> ORDER </h3>
                <input type="radio" id="asc" name="order" onChange={() => setOrder("asc")} ></input>
                <label htmlFor="asc"> Ascending </label>
                <br></br>
                <input type="radio" id="desc" name="order" onChange={() => setOrder("desc")}></input>
                <label htmlFor="asc"> Descending </label>

                <br></br>
                <button className="sort-button" type="submit"> Sort </button>
            </form>
        </div>
        </div>
        </>
    )
}