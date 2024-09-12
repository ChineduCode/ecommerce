'use client'

import { TbTrash } from "react-icons/tb";
import axios from "axios";
import { useState, useEffect, useReducer } from 'react'
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import WishlistReducer from "@/utils/wishlistReducer";

export default function Wishlist(){
    // const [ wishlists, setWishlists ] = useState([])
    const [wishlists, setWishlists] = useReducer(WishlistReducer, [])
    const [ loading, setLoading ] = useState(true)
    const { data: session } = useSession()

    useEffect(()=> {
        const fetchWishlists = async ()=> {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlists`, {
                    headers: {'Authorization': `Bearer ${session.accessToken}`}
                })
    
                if(response.data){
                    setWishlists(response.data.wishlistItems)
                    console.log(response.data.wishlistItems)
                }
                
            } catch (error) {
                console.error(error)
            } finally{
                setLoading(false)
            }
        }

        if(session){
            fetchWishlists()
        }

    },[session])

    if(loading){
        return <div> <Loading /> </div>
    }

    return(
        <div className="wishlist-page">
            <div className="containers">
                {wishlists.length > 0 ? (
                    wishlists.map((product, index) => (
                        <div key={index} className="product">
                            <div className="img-container">
                                <div className="img">
                                    <img src={product.product.image} alt={product.product.brand} />
                                </div>
                                <div className="img-cover">
                                    <div className="right-bar">
                                        <TbTrash size={22}/>
                                    </div>
                                    <div className="btn-add-to-cart"> <button className='btn'>Add to Cart</button> </div>
                                </div>
                            </div>

                            <div href={`/products/${product.product._id}`} className="product-info">
                                <h3 className="brand">{product.product.brand}</h3>
                                <div className="name">{product.product.name}</div>
                                <div className="selling-cost-prices">
                                    <span className='selling-price'>${product.product.price}</span>
                                    <span className='cost-price'>${product.product.price + ((10/100) * product.product.price)}</span>
                                </div>
                            </div>
                        </div>
                    ))

                ) : (
                    <p>No wishlist found.</p>
                )}
            </div>
        </div>
    )
}
