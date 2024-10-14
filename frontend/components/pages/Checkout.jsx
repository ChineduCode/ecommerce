'use client'

import { PiHouse, PiNote, PiCreditCardBold } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ShippingAddress from "./ShippingAddress";
import ReviewOrder from "./ReviewOrder";
import { useCart } from "@/utils/context/cart/cartContext";
import { useUX } from "@/utils/context/ux/uxContext";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Loading from "../Loading";
import axios from "axios";
import Link from 'next/link'

export default function Checkout(){
    const { state, loadCart } = useCart()
    const { state: modalState, dispatch } = useUX()
    const { data: session } = useSession()
    const [ currentStep, setCurrentStep ] = useState(2)
    const [coupon, setCoupon] = useState('FLAT50')
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [orderStatus, setOrderStatus] = useState('')
    const [loading, setLoading] = useState(true)

    const shippingPrice = 5

    useEffect(()=> {
        const fetchCart = async () => {
            setLoading(true)
            await loadCart()
            setLoading(false)
        }
        fetchCart()
    },[session])

    useEffect(()=> {
        if(state.totalPrice){
            setTotalPrice(state.totalPrice + 5)
        }
    }, [state])

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const checkout = async () => {
        setOrderStatus('processing');
        
        if (typeof window !== 'undefined') {
            try {

                const PaystackPop = (await import('@paystack/inline-js')).default;
                const popup = new PaystackPop();
                popup.checkout({
                    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
                    email: session.user.email,
                    amount: totalPrice * 100,

                    onSuccess: async (transaction) => {
                        const date = new Date()
                        const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/create`,
                            { totalPrice, shippingPrice, ...transaction, date },
                            {headers: {'Authorization': `Bearer ${session.accessToken}`}}
                        )

                        if(response.data){
                            console.log(response.data)
                            setOrderStatus('success');
                            dispatch({ type: 'TOGGLE_MODAL' });
                        }
                    },
                    onLoad: (response) => {
                        console.log("onLoad: ", response);
                    },
                    onCancel: () => {
                        console.log("onCancel");
                    },
                    onError: (error) => {
                        console.log("Error: ", error.message);
                    }
                })
                
            } catch (error) {
                setOrderStatus('failed');
                console.error(error.response?.data.message || error.message);
            }
        }
    };

    if(loading) return <main style={{marginTop: '7rem'}}> <Loading /> </main>

    return (
        <main className="checkout-page">
            <div className="container">
                <h2 className="heading">
                    {currentStep === 1 ? 
                        'Shipping Address': 
                        currentStep === 2 ? 
                        'Review Your Order' : 
                        currentStep === 3 ? 
                        'Payment Method': 
                        null
                    }
                </h2>
                <div className="steps-icons">
                    <span className="address-step-icon"> <PiHouse size={25}/> </span>
                    <span className="review-step-icon"> <PiNote size={25}/> </span>
                    <span className="payment-step-icon"> <PiCreditCardBold size={25}/> </span>
                </div>
                <div className="steps-container">
                    { currentStep === 1 && <ShippingAddress handleNextStep={handleNextStep} />}
                    { currentStep === 2 && <ReviewOrder session={session} /> }
                </div>
            </div>
            <form className="footer">
                <div className="sub-total">
                    <span>SubTotal</span>
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
                    <span className="delivery-charge">${shippingPrice}</span>
                </div>

                <div className="grand-total">
                    <span>Grand Total</span>
                    <span>${totalPrice}</span>
                </div>

                {  currentStep === 2 
                    && 
                    <button 
                        className="place-order-btn" 
                        type="button"
                        onClick={checkout}
                    >
                        Place Order
                    </button> 
                }
            </form>

            {/* Display if Order is successful */}
            {((orderStatus === 'success') && (modalState.isModalOpen)) && <OrderPlaceSuccessful />}
        </main>
    )
}

const OrderPlaceSuccessful = () => {
    return (
        <div className='order-place-successful'>
            <div className="container">
                <div className="icon-container">
                    <div className="first-round">
                        <div className="second-round">
                            <div className="third-round">
                                <HiOutlineShoppingBag size={22}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="heading">Your order is confirmed</div>
                <div className="description">
                    Thanks for shopping! your order hasn't been shipped yet,
                    but we will send you an email when it's done.
                </div>
                <div className="btn-container">
                    <Link href={'/profile/orders'} className="order-page-link">View Order</Link>
                    <Link href={'/'} className="home-page-link">Back to Home</Link>
                </div>
            </div>
        </div>
    )
}
