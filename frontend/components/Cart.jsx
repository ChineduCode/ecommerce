'use client'

import { TbTrash } from "react-icons/tb";
import { useState } from "react/cjs/react.production.min";

export default function Cart(){
    const [noOfItems, setNoOfItems] = useState(0)
    const [items, setItems] = useState([
        {
            productName: 'Girls Pink Moana Printed Dress',
            productQty: 1,
            productPrice: 80.00,
            productImg: '/images/'
        },
        {
            productName: 'Women Textured Handheld Bag',
            productQty: 1,
            productPrice: 90.00,
            productImg: '/images/'
        },
        {
            productName: 'Tailored Cotton Casual Shirt',
            productQty: 2,
            productPrice: 40.00,
            productImg: '/images/'
        },
    ])

    return(
        <section className="cart">
            <div className="heading">You have {noOfItems} items in your cart</div>
            <div className="container">
                <div className="item-content">
                    <div className="img-container"></div>
                    <div className="product-details">
                        <div className="name"></div>
                        <div className="price"> 
                            <span className="qty"></span>
                            <span className="times"></span>
                            <span className="selling-price"></span>
                        </div>
                    </div>
                    <div className="delete-container"> <TbTrash /> </div>
                </div>
            </div>
            <div className="footer">
                <div className="total-container">
                    <span>Subtotal</span>
                    <span>${}</span>
                </div>

                <button className="checkout-btn">Checkout</button>
            </div>
        </section>
    )
}
