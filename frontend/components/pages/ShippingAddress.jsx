'use client'

import CheckoutStep from "../CheckoutStep"
import GrandPrice from "../GrandPrice"

export default function ShippingAddress(){
    return(
        <main className="shipping-address">
            <h1 className="heading"> Shipping Address </h1>
            <div className="containers">
                <div className="address">
                    <CheckoutStep />
                    
                </div>
                <GrandPrice />
            </div>
        </main>
    )
}
