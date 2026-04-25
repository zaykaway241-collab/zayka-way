import React, { useState, useContext, useEffect } from 'react'
import './LoginPopup.css'
import { X } from 'lucide-react' 
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify' // Toast use karne ke liye

const LoginPopup = ({ setShowLogin, initialState }) => {

    const { url, setToken } = useContext(StoreContext)
    
    
    const [currState, setCurrState] = useState(initialState || "Login")
    
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(""); 
                toast.success(`Welcome to Zayka WAY!`);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Server down hai ya network error!");
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    
                    <X onClick={() => setShowLogin("")} size={25} style={{cursor:'pointer'}} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : 
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    }
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup