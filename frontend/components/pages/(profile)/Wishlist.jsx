'use client'

import { TbTrash } from "react-icons/tb";
import { useEffect } from 'react';
import Loading from "@/components/Loading";
import { useWishlist } from "@/utils/context/wishlist/wishlistContext";

export default function Wishlist() {
    const { state, loadWishlist, removeFromWishlist } = useWishlist();

    useEffect(() => {
        loadWishlist();
    }, []);

    if (state.loading) {
        return <div> <Loading /> </div>;
    }

    return (
        <div className="wishlist-page">
            <div className="containers">
                {state.items.length > 0 ? (
                    state.items.map((product, index) => (
                        <div key={index} className="product">
                            <div className="img-container">
                                <div className="img">
                                    <img src={product.product.image} alt={product.product.brand} />
                                </div>
                                <div className="img-cover">
                                    <div className="right-bar">
                                        <TbTrash size={25} />
                                    </div>
                                    <div className="btn-add-to-cart">
                                        <button className='btn'>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                            <div href={`/products/${product.product._id}`} className="product-info">
                                <h3 className="brand">{product.product.brand}</h3>
                                <div className="name">{product.product.name}</div>
                                <div className="selling-cost-prices">
                                    <span className='selling-price'>${product.product.price}</span>
                                    <span className='cost-price'>${(product.product.price + ((10/100) * product.product.price)).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No wishlist found.</p>
                )}
            </div>
        </div>
    );
}
