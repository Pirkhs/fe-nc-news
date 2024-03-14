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

function App() {

  const [loggedInUser, setLoggedInUser] = useState({
    username: "tickle122"
  })
  return (
    <UserContext.Provider value = {{loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser}}>
      <Header/>
      <Nav/>
      <br></br>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/articles" element={<Articles/>}> </Route>
        <Route path="/articles/:article_id" element={<SingleArticle/>}></Route>
        <Route path="*" element={<Error msg={'404: Page not found'}/>} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
