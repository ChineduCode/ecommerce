'use client'

import { TbTrash } from "react-icons/tb";
import { useEffect } from 'react';
import Loading from "@/components/Loading";
import Loader from "@/components/Loader"
import { useWishlist } from "@/utils/context/wishlist/wishlistContext";
import { useCart } from "@/utils/context/cart/cartContext";
import ResponseMsg from "@/components/ResponseMsg";

export default function Wishlist() {
    const { state: wishlistState, loadWishlist, removeItemFromWishlist } = useWishlist();
    const { state: cartState, addItemToCart } = useCart()

    useEffect(() => {
        loadWishlist();
    }, []);

    const handleRemoveItem = async (productId)=>{
        await removeItemFromWishlist(productId)
    }

    const handleMoveToCart = async (productId) => {
        const qty = 1
        await addItemToCart(productId, qty)
        loadWishlist()
    }

    if (wishlistState.loading) {
        return <div style={{width: '100%'}}> <Loading /> </div>;
    }

    return (
        <div className="wishlist-page" id='wishlists'>
            <div className="containers">
                {wishlistState.items?.length > 0 ? (
                    wishlistState.items.map((product, index) => (
                        <div key={index} className="product">
                            <div className="img-container">
                                <div className="img">
                                    <img src={product.image} alt={product.brand} />
                                </div>
                                <div className="img-cover">
                                    <div className="right-bar">
                                        <button onClick={()=> handleRemoveItem(product._id)}>
                                            <TbTrash size={25} />
                                        </button>
                                    </div>
                                    <div className="btn-add-to-cart">
                                        <button className='btn' onClick={()=> handleMoveToCart(product._id)}>
                                            Move to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div href={`/products/${product._id}`} className="product-info">
                                <h3 className="brand">{product.brand}</h3>
                                <div className="name">{product.name}</div>
                                <div className="selling-cost-prices">
                                    <span className='selling-price'>${product.price}</span>
                                    <span className='cost-price'>${(product.price + ((10/100) * product.price)).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{textAlign: 'center', width: '100%'}}>No wishlist found.</p>
                )}
            </div>
            { cartState.responseMsg && <ResponseMsg /> }
        </div>
    );
}
