import { useState } from 'react'
import './App.css'
import Header from '../components/Header'
import { Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import Home from '../components/Home'

function App() {


  return (
    <>
      <Header/>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default App
