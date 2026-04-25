import React, { useContext } from 'react';
import './TopBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, ShoppingBag } from 'lucide-react'; 
import { StoreContext } from '../context/StoreContext';

// setCategory ko props mein liya hai
const TopBar = ({ setShowLogin, setCategory }) => {
  const navigate = useNavigate();
  const { cartItems, token, setToken } = useContext(StoreContext);

  const getTotalCartItems = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    }
    return totalCount;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className="main-nav">
    
      <Link 
        to='/' 
        className="nav-brand" 
        style={{textDecoration:'none', color:'inherit'}}
        onClick={() => setCategory("All")}
      >
        <div className="logo-box">Z</div>
        <div className="brand-text-wrapper">
          <span className="brand-main">Zayka</span>
          <span className="brand-sub">WAY</span>
        </div>
      </Link>

      <ul className="nav-links">
      
        <li onClick={() => setCategory("All")}><Link to="/">Explore</Link></li>
        <li><Link to="/myorders">MyOrders</Link></li>
      </ul>

      <div className="nav-actions">
        <Link to='/cart' className="cart-container">
          <ShoppingCart size={22} color="#444" />
          {getTotalCartItems() > 0 && (
            <span className="cart-badge">{getTotalCartItems()}</span>
          )}
        </Link>

        {!token ? (
          <div className="auth-buttons">
            <button className="btn-login" onClick={() => setShowLogin("Login")}>Login</button>
            <button className="btn-signup" onClick={() => setShowLogin("Sign Up")}>Register</button>
          </div>
        ) : (
          <div className="nav-profile">
            <div className='profile-icon-wrapper'>
              <User size={25} color="#2e7d32" className="profile-icon" />
            </div>
            
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <ShoppingBag size={18} /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <LogOut size={16} color='#d32f2f' /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;