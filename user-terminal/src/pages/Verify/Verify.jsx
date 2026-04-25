import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'; 
import axios from 'axios';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    
    // Galti yahan thi: setCartItems ko bhi StoreContext se extract karna hai
    const { url, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            // Backend API call payment confirm karne ke liye
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            
            if (response.data.success) {
                // Payment success ho gaya toh cart khali karo
                setCartItems({}); 
                navigate("/myorders"); 
            } else {
                // Agar payment fail hua toh wapas home par bhej do
                navigate("/"); 
            }
        } catch (error) {
            console.log("Verification Error:", error);
            navigate("/");
        }
    }

    useEffect(() => {
        // Sirf tabhi verify karo jab orderId aur success params mil jayein
        if (orderId && success !== null) {
            verifyPayment();
        } else {
            navigate("/"); 
        }
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
            <p>Processing your payment...</p>
        </div>
    )
}

export default Verify;