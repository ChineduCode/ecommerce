'use client'

import { TbTrash } from "react-icons/tb";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cart(){
    const [cart, setCart] = useState([])
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)
    const router = useRouter()

    useEffect(()=> {
        const fetchCart = async ()=> {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/carts`, {
                    headers: { 'Authorization' : `Bearer ${session.accessToken}` }
                })
                
                if(response.data){
                    setCart(response.data.cartItems)
                    setTotalPrice(response.data.cartItems.reduce((sum, cartItem)=> sum + (cartItem.product.price * cartItem.quantity), 0));
                }
                
            } catch (error) {
                console.error('Error fetching user cart', error)
            } finally {
                setLoading(false)
            }
        }

        if(session){
            fetchCart()
        }else{
            router.push('/login')
        }

    }, [session, setCart])

    const handleDelete = async (id)=> {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/carts/delete`,
                {itemID: id},
                {headers: {'Authorization': `Bearer ${session.accessToken}`}}
            )

            if(response.data){
                setCart(response.data.cart.cartItems)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <section className="cart">
            <div className="heading">You have {cart.length} items in your cart</div>
            { loading ? <Loader /> :
              cart.length > 0 ?
                <>
                    <div className="container">
                        {cart.map((cartItem, index) => (
                            <div className="item-content" key={index}>
                                <div className="product-details">
                                    <div className="img-container">
                                        <img src={cartItem.product.image} alt={cartItem.product.name} />
                                    </div>
                                    <div className="detail">
                                        <div className="name">{cartItem.product.name}</div>
                                        <div className="price"> 
                                            <span className="qty">{cartItem.quantity}</span>
                                            <span className="times">x</span>
                                            <span className="selling-price">${cartItem.product.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="delete-container"> <TbTrash size={22} onClick={(e)=> handleDelete(cartItem._id)}/> </div>
                            </div>
                        ))}
                    </div>
                    <div className="footer">
                        <div className="total-price">
                            <span>Subtotal</span>
                            <span>${totalPrice}</span>
                        </div>

                        <Link href='/checkout'>
                            <button className="checkout-btn">Checkout</button>
                        </Link>
                    </div>
                </> :

                <div className="empty-cart">
                    <span>Your cart is empty</span>
                </div>
            }
        </section>
    )
}
