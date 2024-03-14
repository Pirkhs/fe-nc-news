import { useState, useEffect } from 'react'
import { getAllTopics, getArticles, sortArticles } from '../src/api'
import ArticleCard from './ArticleCard'
import Loading from './Loading'
import '../styles/Articles.css'
import { Link, useSearchParams } from 'react-router-dom'

export default function Articles () {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState(null)
    const [order, setOrder] = useState(null)
    
    const [searchParams, setSearchParams] = useSearchParams();
    const topicQuery = searchParams.get("topic")  
    const sortQuery = searchParams.get("sort_by")
    const orderQuery = searchParams.get("order")
    
    const handleSortBy = (e) => {
        e.preventDefault()
        const newParams = new URLSearchParams(searchParams);
        newParams.set('order', order);
        newParams.set('sort_by', sortBy)
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
        if (!sortQuery || !orderQuery) return 
        sortArticles(sortQuery, orderQuery).then(({data: {articles}}) => {
            setArticles(articles)
        })

    }, [sortQuery, orderQuery])

    return isLoading ? (
        <Loading/>
    ) : (
        <>
            <div className="articles-page">
                <div className="articles">
                    {articles.map(article => {
                        return <ArticleCard key={article.article_id} article={article}/>
                    })}
                </div>
                <ul className="filter-by-topics">
                    <h3> Filter By Topic </h3>
                    <br></br>
                    {topics.map(topic => {
                        return <li key={topic.slug}> <Link to={`/articles/?topic=${topic.slug}`}> {topic.slug[0].toUpperCase() + topic.slug.slice(1)}</Link> </li>
                    })}
                </ul>
                <form className="sort-by" onSubmit = {(e) => handleSortBy(e)}>
                    <h3> Sort By </h3>
                    <fieldset>
                        <input type="radio" id="date" name="sort-by" onClick={() => setSortBy("created_at")}></input>
                        <label htmlFor="date"> Date </label>
                        <br></br>
                        <input type="radio" id="comment_count" name="sort-by" onClick={() => setSortBy("comment_count")} ></input>
                        <label htmlFor="comment_count"> Comment Count </label>
                        <br></br>
                        <input type="radio" id="votes" name="sort-by" onClick={() => setSortBy("votes")} ></input>
                        <label htmlFor="Votes"> Votes </label>
                        <br></br>
                    </fieldset>
                    <br></br>
                    <input type="radio" id="asc" name="order" onClick={() => setOrder("asc")} ></input>
                    <label htmlFor="asc"> Ascending </label>
                    <br></br>
                    <input type="radio" id="desc" name="order" onClick={() => setOrder("desc")}></input>
                    <label htmlFor="asc"> Descending </label>

                    <br></br>
                    <button className="sort-button" type="submit"> Sort </button>
                </form>
            </div>
        </>
    )
}