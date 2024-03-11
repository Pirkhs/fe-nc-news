import axios from 'axios'

const newsAPI = axios.create({
    baseURL: 'https://nc-news-xq0k.onrender.com/api'
})

export function getAllArticles () {
    return newsAPI.get("/articles")
}