import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../context/StoreContext'
import { Package } from 'lucide-react' 
import axios from 'axios'

const MyOrders = () => {

  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // Backend se orders mangwane ka function
  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching orders", error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <Package size={30} color='#00a884' />
              
              {/* Items List */}
              <p className="order-items">
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>

              <p className="order-amount">₹{order.amount}.00</p>
              <p className="order-count">Items: {order.items.length}</p>
              
              <p className="order-status">
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p className="no-orders">Abhi tak koi order nahi kiya gaya hai.</p>
        )}
      </div>
    </div>
  )
}

export default MyOrders