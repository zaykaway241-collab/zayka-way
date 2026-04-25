import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './elements/TopBar';
import FoodGallery from './pages/FoodGallery';
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder';
import LoginPopup from './elements/LoginPopup';
import Footer from './elements/Footer';
import MyOrders from './pages/MyOrders';
import Verify from './pages/Verify/Verify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showLogin, setShowLogin] = useState("");
  
  
  const [category, setCategory] = useState("All");

  return (
    <>
      <ToastContainer />
      <Router>
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} initialState={showLogin} /> : <></>}
        <div className='app'>
          
        
          <TopBar setShowLogin={setShowLogin} setCategory={setCategory} />
          
          <Routes>
            
            <Route path="/" element={<FoodGallery category={category} setCategory={setCategory} />} />
            
            <Route path="/cart" element={<Cart setShowLogin={setShowLogin} />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/Myorders' element={<MyOrders />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;