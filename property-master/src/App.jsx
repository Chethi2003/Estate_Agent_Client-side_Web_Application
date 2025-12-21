import { useState } from 'react'
import './App.css'
import Welcome from './components/Welcome.jsx'
import Search from './components/Search.jsx'
import Favourites from './components/Favourites.jsx'

function App() {

  return (
    <>
      <div className="welcome">
        <Welcome />
      </div>
      
      <div className="main-content">
        <Search />
        <Favourites />
      </div>
    </>
  )
}

export default App
