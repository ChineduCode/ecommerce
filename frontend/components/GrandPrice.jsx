export default function GrandPrice(){
    return(
        <div className="total-price">
            <div className="subtotal">
                <span className="text">Subtotal</span>
                <span className="price">$200</span>
            </div>
            <div className="deliver-charge">
                <span className="text">Delivery charge</span>
                <span className="charge">$5</span>
            </div>
            <div className="grand-total">
                <span className="text">Grand Total</span>
                <span className="total">$205</span>
            </div>
        </div>
    )
}
