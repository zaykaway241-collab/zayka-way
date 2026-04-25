import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const { food_list, cartItems, url, token, getTotalCartAmount, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const [paymentMethod, setPaymentMethod] = useState("stripe");

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();


        
        
        if (data.phone.toString().length !== 10) {
            toast.error("Phone number must be exactly 10 digits");
            return; 
        }

        
        if (data.zipcode.toString().length !== 6) {
            toast.error("Pincode must be exactly 6 digits");
            return; 
        }

        
        
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item };
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 40,
            paymentMethod: paymentMethod 
        }

        try {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                if (paymentMethod === "stripe") {
                    const { session_url } = response.data;
                    window.location.replace(session_url);
                } else {
                    setCartItems({});
                    toast.success("Order Placed Successfully!");
                    navigate("/myorders");
                }
            } else {
                toast.error("Error placing order!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Backend connection failed!");
        }
    };

    useEffect(() => {
        if (!token) {
            toast.warn("Please login first!");
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' required />
                    <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' required />
                </div>
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required />
                <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
                <div className="multi-fields">
                    <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
                    <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
                </div>
                <div className="multi-fields">
                    <input 
                        name='zipcode' 
                        onChange={onChangeHandler} 
                        value={data.zipcode} 
                        type="number" 
                        placeholder='Pin code' 
                        required 
                        onInput={(e) => e.target.value = e.target.value.slice(0, 6)} 
                    />
                    <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
                </div>
                <input 
                    name='phone' 
                    onChange={onChangeHandler} 
                    value={data.phone} 
                    type="number" 
                    placeholder='Phone' 
                    required 
                    onInput={(e) => e.target.value = e.target.value.slice(0, 10)} 
                />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>₹{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b></div>
                    </div>

                    <div className="payment-method-selection">
                        <h3>Select Payment Method</h3>
                        <div className={`method-option ${paymentMethod === 'stripe' ? 'active' : ''}`} onClick={() => setPaymentMethod("stripe")}>
                            <div className="radio-circle"></div>
                            <p>Online Payment (Stripe)</p>
                        </div>
                        <div className={`method-option ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod("cod")}>
                            <div className="radio-circle"></div>
                            <p>Cash on Delivery (COD)</p>
                        </div>
                    </div>

                    <button type='submit'>PLACE ORDER</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder