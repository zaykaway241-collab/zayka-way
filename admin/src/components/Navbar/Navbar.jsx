import React from 'react'
import './Navbar.css'
// Ek admin profile icon ke liye lucide-react use kar rahe hain
import { UserCircle } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* Wahi Logo jo frontend mein tha */}
      <div className="nav-brand">
        <div className="logo-box">Z</div>
        <div className="brand-text-wrapper">
          <span className="brand-main">Zayka</span>
          <span className="brand-sub">WAY</span>
        </div>
      </div>
      
      
      <div className="profile-icon">
          <UserCircle size={40} color="#00a884" />
      </div>
    </div>
  )
}

export default Navbar