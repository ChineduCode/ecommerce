import { PiHouse, PiNote, PiCreditCardBold } from "react-icons/pi";
import ShippingAddress from "./ShippingAddress";

export default function Checkout(){
    return (
        <main className="checkout-page">
            <div className="container">
                <h1 className="heading">Shipping Address</h1>
                <div className="steps-container">
                    <span className="address-step-icon"> <PiHouse /> </span>
                    <span className="payment-step-icon"> <PiCreditCardBold /> </span>
                    <span className="review-step-icon"> <PiNote /> </span>
                </div>
                <ShippingAddress />
            </div>
        </main>
    )
}
