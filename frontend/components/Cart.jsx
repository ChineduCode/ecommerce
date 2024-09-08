'use client'

import { TbTrash } from "react-icons/tb";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Cart(){
    const [cart, setCart] = useState([])
    const { data: session } = useSession()

    useEffect(()=> {
        const fetchCart = async ()=> {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/carts`, {
                    headers: { 'Authorization' : `Bearer ${session.accessToken}` }
                })
    
                if(response.data){
                    setCart(response.data)
                }
                
            } catch (error) {
                console.error('Error fetching user cart', error)
            }
        }

        if(session){
            fetchCart
        }
    }, [session, setCart])

    return(
        <section className="cart">
            <div className="heading">You have {noOfItems} items in your cart</div>
            <div className="container">
                <div className="item-content">
                    <div className="img-container"></div>
                    <div className="product-details">
                        <div className="name"></div>
                        <div className="price"> 
                            <span className="qty"></span>
                            <span className="times"></span>
                            <span className="selling-price"></span>
                        </div>
                    </div>
                    <div className="delete-container"> <TbTrash /> </div>
                </div>
            </div>
            <div className="footer">
                <div className="total-container">
                    <span>Subtotal</span>
                    <span>${}</span>
                </div>

                <button className="checkout-btn">Checkout</button>
            </div>
        </section>
    )
}
