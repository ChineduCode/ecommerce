export default function Cart({ cartActive }){
    return(
        <section className={`cart ${cartActive ? 'cart-active' : 'cart'}`}>
            <div className="container">
                <div className="heading">
                    <div className="text">Cart</div>
                </div>
                <div className="content">
                    <div className="empty-cart"> Your cart is empty. </div>
                </div>
            </div>
        </section>
    )
}