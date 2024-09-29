'use client'

import { PiHouse, PiNote, PiCreditCardBold } from "react-icons/pi";
import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";
import ReviewOrder from "./ReviewOrder";
import { useCart } from "@/utils/context/cart/cartContext";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";

export default function Checkout(){
    const { state, loadCart } = useCart()
    const { data: session } = useSession()
    const currentStepRef = useRef(null)
    const [ currentStep, setCurrentStep ] = useState(1)

    useEffect(()=> {
        if(session){
            loadCart()
        }
        console.log(state)
    },[session])

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1)
        console.log(currentStep)
    }

    return (
        <main className="checkout-page">
            <div className="container">
                <h2 className="heading">
                    {currentStep === 1 ? 
                        'Shipping Address': 
                        currentStep === 2 ? 
                        'Payment Method': 
                        currentStep === 3 ? 
                        'Review Your Order' : 
                        null
                    }
                </h2>
                <div className="steps-icons">
                    <span className="address-step-icon"> <PiHouse size={25}/> </span>
                    <span className="payment-step-icon"> <PiCreditCardBold size={25}/> </span>
                    <span className="review-step-icon"> <PiNote size={25}/> </span>
                </div>
                <div className="steps-container">
                    { currentStep === 1 && <ShippingAddress handleNextStep={handleNextStep} />}
                    { currentStep === 2 && <PaymentMethod /> }
                    { currentStep === 3 && <ReviewOrder /> }
                </div>
            </div>
            {/* <form className="footer">
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
            </form> */}
        </main>
    )
}
