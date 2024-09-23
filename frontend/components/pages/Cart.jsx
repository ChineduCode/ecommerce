'use client'

import { TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import Count from "../Count";
import Rating from "../Rating";
import Loading from "../Loading";
import Link from "next/link";
import { useCart } from "@/utils/context/cart/cartContext";

export default function Cart(){
    const { state, loadCart, removeItemFromCart } = useCart()
    const [coupon, setCoupon] = useState('FLAT50')

    useEffect(()=> {
        loadCart()
    }, [])

    const handleDelete = async (id)=> {
        await removeItemFromCart(id)
    }

    const handleCoupon = async (e)=> {
        e.preventDefault()

        console.log(e.target)
    }

    if(state.loading) return <div style={{padding: '8rem'}}> <Loading /> </div>

    return(
        <main className="cart-page">
            <div className="header">
                <h1>Shopping Cart</h1>
            </div>
            { state.items.length > 0 ?
                <div className="cart-container">
                    <div className="container">
                        <div className="heading">You have {state.totalQty} items in your cart</div>
                        {state.items.map((cartItem, index) => (
                            <div className="product-details" key={index}>
                                <div className="img-container">
                                    <img src={cartItem.product.image} alt={cartItem.product.name} />
                                </div>
                                <div className="details-container">
                                    <div className="detail">
                                        <div className="name">{cartItem.product.name}</div>
                                        <div className="brand">{cartItem.product.brand}</div>
                                        <div className="rating-container">
                                            <span>{cartItem.product.rating}</span>
                                            <Rating rating={cartItem.product.rating}/>
                                        </div>
                                    </div>

                                    <div className="count-price-remove-container">
                                        <div className="price-container">
                                            <div className="price"> 
                                                <span className="qty">{cartItem.quantity}</span>
                                                <span className="times">x</span>
                                                <span className="selling-price">${cartItem.product.price}</span>
                                            </div>
                                            <div className="sum-price">$20</div>
                                        </div>
                                        <Count />
                                        <div className="delete-container"> <TbTrash size={22} onClick={(e)=> handleDelete(cartItem._id)}/> </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form className="footer" onSubmit={handleCoupon}>
                        <div className="sub-total">
                            <span>Subtotal</span>
                            <span>${state.totalPrice}</span>
                        </div>
                        <div className="coupon">
                            <label htmlFor="discount-code">Enter Discount Code</label>
                            <div className="control">
                                <input 
                                    type="text" 
                                    name="coupon"
                                    value={coupon}
                                    onChange={(e)=> setCoupon(e.target.value)} 
                                />
                                <button type="button">Apply</button>
                            </div>
                        </div>
                        <div className="delivery-charge">
                            <span>Delivery charge</span>
                            <span className="delivery-charge">$5</span>
                        </div>

                        <div className="grand-total">
                            <span>Grand Total</span>
                            <span>${state.totalPrice + 5}</span>
                        </div>

                        <Link href='/checkout'>
                            <button className="checkout-btn" type="button">Proceed to Checkout</button>
                        </Link>
                    </form>
                </div> :

                <div className="empty-cart">
                    <span>Your cart is empty</span>
                </div>
            }
        </main>
    )
}
