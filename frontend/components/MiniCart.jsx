'use client'

import { TbTrash } from "react-icons/tb";
import { useEffect } from "react";
import Loader from "./Loader";
import Link from "next/link";
import { useCart } from "@/utils/context/cart/cartContext";
import { useSession } from "next-auth/react";

export default function MiniCart(){
    const { state, loadCart, removeItemFromCart } = useCart()
    const { data: session } = useSession()

    useEffect(()=> {
        if(session){
            loadCart()
        }

    }, [session])

    const handleDelete = async (id)=> {
        await removeItemFromCart(id)
    }

    return(
        <section className="mini-cart">
            <div className="heading">You have {state.totalQty} items in your cart</div>
            { state.loading ? <Loader /> :
              state.items.length > 0 ?
                <>
                    <div className="container">
                        {state.items.map((cartItem, index) => (
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
                            <span>${state.totalPrice}</span>
                        </div>

                        <Link href={'/cart'}>
                            <button className="cart-btn">View Cart</button>
                        </Link>

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
