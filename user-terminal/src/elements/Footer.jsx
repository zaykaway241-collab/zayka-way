import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h2 className="footer-logo">Zayka <span>WAY</span></h2>
            <p>Taste the excellence in every bite. Hum late hain aapke liye shehar ka sabse swadisht khana, ekdum fresh aur hamesha garam.</p>
            <div className="footer-social">
                {/* Social icons ke placeholder */}
                <span>FB</span> <span>TW</span> <span>IG</span>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-9876543210</li>
                <li>contact@zaykaway.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026 © ZaykaWay.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer