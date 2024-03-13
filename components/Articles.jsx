import { useState, useEffect } from 'react'
import { getAllArticles, getAllTopics, getArticlesByTopic } from '../src/api'
import ArticleCard from './ArticleCard'
import Loading from './Loading'
import '../styles/Articles.css'
import { Link, useSearchParams } from 'react-router-dom'

export default function Articles () {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const [searchParams, setSearchParams] = useSearchParams();
    const topicQuery = searchParams.get("topic")  
    

    useEffect(() => {
        setIsLoading(true)
        getAllArticles().then(articles => {
            setArticles(articles.data.articles)
            setIsLoading(false)
        })

        getAllTopics().then(({data: {topics}}) => {
            setTopics(topics)
        })

    }, [topicQuery])

    useEffect(() => {
        if(!topicQuery) return
        setIsLoading(true)
        getArticlesByTopic(topicQuery).then(({data: {articles}}) => { 
            setArticles(articles)
            setIsLoading(false)
        })
    }, [topicQuery])

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
            </div>
        </>
    )
}