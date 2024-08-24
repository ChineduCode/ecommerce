'use client'

import { BiPhoneCall } from "react-icons/bi";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaXTwitter, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { useState } from 'react'
import axios from "axios";

export default function Footer(){
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [placeholder, setPlaceholder] = useState(true)

    const handleSubscription = async (e)=> {
        e.preventDefault()

        try {
            if(!email){
                throw new Error('Email field is empty')
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailPattern.test(email)){
                throw new Error('Invalid email address')
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/subscribe`,
                { email },
                { headers: {'Content-Type': 'application/json'} }
            )
            
            console.log('Subscription successful', response.data)
            setEmail('')
            setError('')
            setPlaceholder(true)

        } catch (error) {
            setError(error.message)
            return
        }
    }
    
    return(
        <footer className="footer">
            <div className="top-footer">
                <div className="contact container">
                    <div className="logo">Shop</div>
                    <ul>
                        <li className="phone"> <BiPhoneCall size={22}/> <span>(234) 9069061684 </span> </li>
                        <li className="email"> <IoMailOutline size={22}/> <span>chineducode@gmail.com</span> </li>
                        <li className="location"> <IoLocationOutline size={22}/> <span> No.6 Isingwu street Nkpor-Agu, Nkpor, Anambra state </span> </li>
                    </ul>
                </div>
                <div className="information container">
                    <div className="header">Information</div>
                    <ul>
                        <li><Link href='/account'>My Account</Link></li>
                        <li><Link href='/login'>Login</Link></li>
                        <li><Link href='/cart'>My Cart</Link></li>
                        <li><Link href='/wishlist'>My Wishlist</Link></li>
                        <li><Link href='/checkout'>Checkout</Link></li>
                    </ul>
                </div>
                <div className="services container">
                    <div className="header">Services</div>
                    <ul>
                        <li><Link href='/about'>About Us</Link></li>
                        <li><Link href='/careers'>Careers</Link></li>
                        <li><Link href='/delivery-information'>Delivery Information</Link></li>
                        <li><Link href='/privacy-policy'>Privacy Policy</Link></li>
                        <li><Link href='/terms-conditions'>Terms & Conditions</Link></li>
                    </ul>
                </div>
                <form method='post' className="subscribe container" onSubmit={handleSubscription}>
                    <div className="header">Subscribe</div>
                    <div className="description">
                        Enter your email below to be the first to know 
                        about new collections and product launches.
                    </div>
                    <div className="form-control">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            onFocus={()=> setPlaceholder(false)}
                        />
                        <div className="placeholder">
                            { placeholder && <div className="email-icon"> <IoMailOutline size={22}/> <span>Your Email</span> </div> }
                            <button type='submit'> <FaArrowRight size={22}/> </button>
                        </div>
                    </div>
                </form>
            </div>
            
            <div className="bottom-footer">
                <div className="payment-icons-container">
                    <img src="/payment-icons/visa.png" alt="vscard" />
                    <img src="/payment-icons/mastercard.png" alt="mscard" />
                    <img src="/payment-icons/gpay.png" alt="gpay" />
                    <img src="/payment-icons/amex.png" alt="amex" />
                    <img src="/payment-icons/paypal.png" alt="paypal" />
                </div>
                <div className="copyright-container">
                    &copy;2024 Shop All Rights reserved
                </div>
                <div className="socialmedia-container">
                    <FaFacebookF size={22}/> <FaInstagram size={22}/> <FaXTwitter size={22}/>
                </div>
            </div>
        </footer>
    )
}
