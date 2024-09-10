import { FiHome } from "react-icons/fi";
import { BsCash } from "react-icons/bs";
import { PiNote } from "react-icons/pi";

export default function CheckoutStep(){
    return(
        <div className='checkout-steps'>
            <div className="address-step"> <FiHome /> </div>
            <div className="payment-detail-step"> <BsCash /> </div>
            <div className="review-step"> <PiNote /> </div>
        </div>
    )
}
