import { useCart } from "@/utils/context/cart/cartContext"

export default function ReviewOrder({ session }){
    const { state } = useCart()
    const address = session?.user?.addresses.find((address) => (address.defaultAddress)) || session?.user?.addresses[0]
    console.log('from prop drilign', address)

    return(
        <div className="review-order-step">
            <h3>Estimate delivery - 3 days</h3>
            <div className="containers">
                <div className="cart-container">
                    {state.items.map((item, index) => (
                        <div className="item" key={index}>
                            <div className="img-container">
                                <img src={item.product.image} alt={item.product.image} />
                            </div>
                            <div className="detail-container">
                                <div className="name">{item.product.name}</div>
                                <div className="price">${item.product.price}</div>
                                <div className="qty">Quantity: {item.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="address-container">
                    <h3>Shipping Address</h3>
                    <div className="address">
                        <div className="name">{address.street}</div>
                        <div className="street">
                            {`${address.houseNo} ${address.street} ${address.city}, ${address.state}, ${address.country} ${address.postalCode}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
