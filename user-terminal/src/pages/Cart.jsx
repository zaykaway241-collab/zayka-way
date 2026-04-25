import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

const Cart = ({ setShowLogin }) => { 
  const { cartItems, food_list, removeFromCart, url, token } = useContext(StoreContext); 
  const navigate = useNavigate();

  const calculateTotal = () => {
    let total = 0;
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });
    return total;
  };

  // 4. Naya Function Checkout handle karne ke liye
  const handleCheckout = () => {
    if (!token) {
      toast.error("Please login first to place an order!"); // Stylish Error
      setShowLogin(true); // Direct Login Popup khulega
    } else if (calculateTotal() === 0) {
      toast.warn("Your cart is empty!"); // Khali cart par warning
    } else {
      navigate('/order');
    }
  };

  return (
    <div className='cart-page'>
      <div className="cart-table-wrapper">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className='cart-items-title cart-items-item'>
                    <img src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{calculateTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{calculateTotal() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{calculateTotal() === 0 ? 0 : calculateTotal() + 40}</b>
            </div>
          </div>
  
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;