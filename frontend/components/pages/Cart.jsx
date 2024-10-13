'use client'

import { TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import Count from "../Count";
import Rating from "../Rating";
import Loading from "../Loading";
import { useCart } from "@/utils/context/cart/cartContext";
import ResponseMsg from "../ResponseMsg";
import { useRouter } from "next/navigation";
import Link from 'next/link'

export default function Cart(){
    const { state, loadCart, removeItemFromCart, updateUserCart } = useCart()
    const [coupon, setCoupon] = useState('FLAT50')
    const [nums, setNums] = useState([])
    const [prices, setPrices] = useState([])
    const [totals, setTotals] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(()=> {
        loadCart()
    }, [])
    
    useEffect(()=> {
        if (state.items?.length > 0) {
            setNums(state.items.map(item => item.quantity)); // Initialize quantities
            setPrices(state.items.map(item => item.product.price)); // Initialize prices
            setTotals(state.items.map(item => item.quantity * item.product.price)); // Initialize totals
            setSubTotal(state.totalPrice)
            setCart([...state.items])
        }
        setLoading(false)
    },[state.items])

    useEffect(()=> {
        setGrandTotal(subTotal + 5)
    },[subTotal])

    const handleDelete = async (id)=> {
        await removeItemFromCart(id)
    }

    const handleCoupon = async (e)=> {
        e.preventDefault()
        return null
    }

    const handleCartUpdate = async ()=> {
        try {
            const updatedCart = cart.map((item, index) => ({
                productId: item.product._id,
                quantity: nums[index],
            }));
            await updateUserCart(updatedCart) 
            router.push('/checkout')
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    }

    if(loading) return <div style={{padding: '8rem'}}> <Loading /> </div>

    return(
        <main className="cart-page">
            <div className="header">
                <h1>Shopping Cart</h1>
            </div>
            { state.items?.length > 0 ?
                <div className="cart-container">
                    <div className="container">
                        <div className="heading">You have {state.totalQty} items in your cart</div>
                        {state.items?.map((cartItem, index) => (
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
                                                <span className="qty">{nums[index]}</span>
                                                <span className="times">x</span>
                                                <span className="selling-price">${prices[index]}</span>
                                            </div>
                                            <div className="sum-price">${totals[index]}</div>
                                        </div>
                                        <Count qty={nums[index]} setQty={(value)=> {
                                            const updatedNums = [...nums];
                                            updatedNums[index] = value
                                            setNums(updatedNums)
                                            
                                            const newTotals = [...totals]
                                            newTotals[index] = value * prices[index]
                                            setTotals(newTotals)
                                            
                                            const newSubTotal = newTotals.reduce((sum, total) => sum + total, 0)
                                            setSubTotal(newSubTotal)
                                            setGrandTotal(newSubTotal + 5)

                                            const updatedCart = [...cart]
                                            updatedCart[index].quantity = value
                                            setCart(updatedCart)
                                        }}/>
                                        <div className="delete-container"> <TbTrash size={22} onClick={(e)=> handleDelete(cartItem._id)}/> </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form className="footer" onSubmit={handleCoupon}>
                        <div className="sub-total">
                            <span>Subtotal</span>
                            <span>${subTotal}</span>
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
                            <span>${grandTotal}</span>
                        </div>

                        <button 
                            className="checkout-btn" 
                            type="submit"
                            onClick={handleCartUpdate}
                            disabled={state.loading}
                            style={{backgroundColor: state.loading ? '#ccc': null}}
                            >
                                {state.loading ? 'Updating Cart': 'Proceed to Checkout'}
                        </button>

                        {state.responseMsg && <ResponseMsg />}
                    </form>
                </div> :

                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <Link href={'/shop'}>Continue shopping</Link>
                </div>
            }
        </main>
    )
}
