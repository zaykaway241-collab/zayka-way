import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
// Assets ka path wahi rehne diya jo tune diya tha
import { assets } from '../../user-terminal/src/assets/assets' 
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const url = "https://zayka-way.onrender.com"

  return (
    <div className='admin-app'>
      <ToastContainer />
      <Navbar />
      <hr />
      
      
      <div className='app-content'>
        <Sidebar />
        
        
        <div className='pages-content'>
          <Routes>
            <Route path="/add" element={<Add url={url}/>} />
            <Route path="/list" element={<List url={url}/>} />
            <Route path="/orders" element={<Orders url={url}/>} />
          </Routes>
          
          
          <footer className="admin-footer">
            <p>© 2026 Zayka WAY Admin Panel. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App;
