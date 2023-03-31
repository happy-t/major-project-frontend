import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Students from './pages/students/Students'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/class/:id' element={<Students />} />
      </Routes>
    </>
  )
}

export default App