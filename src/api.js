import axios from 'axios'

const newsAPI = axios.create({
    baseURL: 'https://nc-news-xq0k.onrender.com/api'
})

export function getAllArticles () {
    return newsAPI.get("/articles")
}

export function getArticleById (article_id) {
    return newsAPI.get(`/articles/${article_id}`)
}

export function getCommentsByArticleId (article_id) {
    return newsAPI.get(`/articles/${article_id}/comments`)
}

export function incrementArticleVoteCount (article_id, incVotes) {
    return newsAPI.patch(`/articles/${article_id}`, {incVotes: incVotes})
}

export function postComment (article_id, username, body) {
    return newsAPI.post(`/articles/${article_id}/comments`, {username, body,})
}