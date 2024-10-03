'use client'

import { PiHouse, PiNote, PiCreditCardBold } from "react-icons/pi";
import ShippingAddress from "./ShippingAddress";
import ReviewOrder from "./ReviewOrder";
import PayPalCheckout from "../PayPalCheckout";
import { useCart } from "@/utils/context/cart/cartContext";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Loading from "../Loading";

export default function Checkout(){
    const { state, loadCart } = useCart()
    const { data: session, status } = useSession()
    const currentStepRef = useRef(null)
    const [ currentStep, setCurrentStep ] = useState(2)
    const [coupon, setCoupon] = useState('FLAT50')
    const [ totalPrice, setTotalPrice ] = useState(0)

    const shippingPrice = 5

    useEffect(()=> {
        if(session){
            loadCart()
        }
    },[session])

    useEffect(()=> {
        if(state.totalPrice){
            setTotalPrice(state.totalPrice + 5)
        }
    }, [state])

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    if(status === 'loading') return <main> <Loading /> </main>

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
                    { currentStep === 3 && <PayPalCheckout shippingPrice={shippingPrice} totalPrice={totalPrice} session={session}/> }
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
                        onClick={handleNextStep}
                    >
                        Place Order
                    </button> 
                }
            </form>
        </main>
    )
}
