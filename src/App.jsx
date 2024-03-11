import { useState } from 'react'
import '../styles/App.css'
import Header from '../components/Header'
import { Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import Home from '../components/Home'
import Articles from '../components/Articles'

function App() {


  return (
    <>
      <Header/>
      <Nav/>
      <br></br>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/articles" element={<Articles/>}> </Route>
      </Routes>
    </>
  )
}

export default App
