import { useState, useEffect } from 'react'
import { getAllArticles } from '../src/api'
import ArticleCard from './ArticleCard'
import Loading from './Loading'

export default function Articles () {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getAllArticles().then(articles => {
            setArticles(articles.data.articles)
            setIsLoading(false)
        })
    }, [])


    

    return isLoading ? (
        <Loading/>
    ) : (
        <div className="articles">
            {articles.map(article => {
                return <ArticleCard key={article.article_id} article={article}/>
            })}
        </div>
    )
}