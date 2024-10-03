'use client';

import { useState } from 'react';
import PayPalCheckout from '../PaypalCheckout';
import axios from 'axios';

export default function PaymentMethod({handleNextStep}) {
    // For Debit/Credit Card Details
    // const [cardDetails, setCardDetails] = useState({
    //     cardNumber: '',
    //     cardName: '',
    //     expiryDate: '',
    //     CVC: ''
    // });

    // For PayPal
    // const [paypalDetails, setPaypalDetails] = useState({
    //     email: '',
    //     password: ''
    // });

    // Track selected payment method
    // const [selectedMethod, setSelectedMethod] = useState('card'); // Default to card

    // Handle changes for card details
    // const handleCardDetailChange = (e) => {
    //     setCardDetails({
    //         ...cardDetails,
    //         [e.target.name]: e.target.value
    //     });
    // };

    // Handle changes for PayPal details
    // const handlePaypalDetailChange = (e) => {
    //     setPaypalDetails({
    //         ...paypalDetails,
    //         [e.target.name]: e.target.value
    //     });
    // };

    // Handle payment method selection
    // const handlePaymentMethodChange = (e) => {
    //     setSelectedMethod(e.target.value);
    // };

    return (
        // <div className="payment-method-step">
        //     <h3>Select a Payment Method</h3>
        //     <div className="method-container">
        //         {/* Credit/Debit Card Form */}
        //         <form className="card-method">
        //             <div className="radio-input">
        //                 <input
        //                     type="radio"
        //                     name="payment-method"
        //                     value="card"
        //                     checked={selectedMethod === 'card'}
        //                     onChange={handlePaymentMethodChange}
        //                 />
        //                 <label>Credit/Debit Card</label>
        //             </div>
        //             {selectedMethod === 'card' && (
        //                 <div className="form-container">
        //                     <div className="form-control">
        //                         <label htmlFor="cardNumber">Card Number</label>
        //                         <input
        //                             type="number"
        //                             name="cardNumber"
        //                             value={cardDetails.cardNumber}
        //                             onChange={handleCardDetailChange}
        //                         />
        //                     </div>
        //                     <div className="form-control">
        //                         <label htmlFor="cardName">Card Name</label>
        //                         <input
        //                             type="text"
        //                             name="cardName"
        //                             value={cardDetails.cardName}
        //                             onChange={handleCardDetailChange}
        //                         />
        //                     </div>
        //                     <div className="form-control">
        //                         <label htmlFor="expiryDate">Expiry Date</label>
        //                         <input
        //                             type="text"
        //                             name="expiryDate"
        //                             value={cardDetails.expiryDate}
        //                             onChange={handleCardDetailChange}
        //                         />
        //                     </div>
        //                     <div className="form-control">
        //                         <label htmlFor="CVC">CVC</label>
        //                         <input
        //                             type="number"
        //                             name="CVC"
        //                             value={cardDetails.CVC}
        //                             onChange={handleCardDetailChange}
        //                         />
        //                     </div>
        //                     <button>Add Card</button>
        //                 </div>
        //             )}
        //         </form>

        //         {/* PayPal Form */}
        //         <form className="paypal-method">
        //             <div className="radio-input">
        //                 <input
        //                     type="radio"
        //                     name="payment-method"
        //                     value="paypal"
        //                     checked={selectedMethod === 'paypal'}
        //                     onChange={handlePaymentMethodChange}
        //                 />
        //                 <label>PayPal</label>
        //             </div>
        //             {selectedMethod === 'paypal' && (
        //                 <div className="form-container">
        //                     <div className="form-control">
        //                         <label htmlFor="paypalEmail">PayPal Email</label>
        //                         <input
        //                             type="email"
        //                             name="email"
        //                             value={paypalDetails.email}
        //                             onChange={handlePaypalDetailChange}
        //                         />
        //                     </div>
        //                     <div className="form-control">
        //                         <label htmlFor="paypalPassword">PayPal Password</label>
        //                         <input
        //                             type="password"
        //                             name="password"
        //                             value={paypalDetails.password}
        //                             onChange={handlePaypalDetailChange}
        //                         />
        //                     </div>
        //                     <button>Pay with Paypal</button>
        //                 </div>
        //             )}
        //         </form>
        //         <form className="pay-on-delivery">
        //             <div className="radio-input">
        //                 <input
        //                     type="radio"
        //                     name="payment-method"
        //                     value="delivery"
        //                     checked={selectedMethod === 'delivery'}
        //                     onChange={handlePaymentMethodChange}
        //                 />
        //                 <label>Cash on Delivery</label>
        //             </div>
        //         </form>
        //         <button 
        //             type='button' 
        //             className='continue-btn'
        //             onClick={handleNextStep}
        //         >
        //             Continue
        //         </button>
        //     </div>
        // </div>
        <PayPalCheckout />
    );
}
