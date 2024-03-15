import { useState } from 'react'
import '../styles/App.css'
import Header from '../components/Header'
import { Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import Home from '../components/Home'
import Articles from '../components/Articles'
import SingleArticle from '../components/SingleArticle'
import UserContext from '../components/User'
import Error from '../components/Error'
import UsersPage from '../components/UsersPage'

function App() {

  const [loggedInUser, setLoggedInUser] = useState({
    avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
    username: "tickle122",
    name: "Tom Tickle"
    
  })
  return (
    <UserContext.Provider value = {{loggedInUser, setLoggedInUser}}>
      <Header/>
      <Nav/>
      <br></br>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/articles" element={<Articles/>}> </Route>
        <Route path="/articles/:article_id" element={<SingleArticle/>}></Route>
        <Route path="/users" element={<UsersPage/>}></Route>
        <Route path="*" element={<Error msg={'404: Page not found'}/>} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
