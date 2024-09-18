'use client'

import { TbTrash } from "react-icons/tb";
import { useEffect } from 'react';
import Loading from "@/components/Loading";
import { useWishlist } from "@/utils/context/wishlist/wishlistContext";
import ResponseMsg from "@/components/ResponseMsg";

export default function Wishlist() {
    const { state, loadWishlist, removeItemFromWishlist } = useWishlist();

    useEffect(() => {
        loadWishlist();
    }, []);

    const handleRemoveItem = async (id)=>{
        console.log(id)
        await removeItemFromWishlist(id)
        console.log('Item removed')
    }

    if (state.loading) {
        return <div style={{width: '100%'}}> <Loading /> </div>;
    }

    return (
        <div className="wishlist-page" id='wishlists'>
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
                                        <button onClick={()=> handleRemoveItem(product._id)}>
                                            <TbTrash size={25} />
                                        </button>
                                    </div>
                                    <div className="btn-add-to-cart">
                                        <button className='btn'>Move to Cart</button>
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
            { state.responseMsg && <ResponseMsg /> }
        </div>
    );
}
