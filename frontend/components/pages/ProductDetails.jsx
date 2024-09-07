'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from "react"
import axios from "axios"
import Loading from '../Loading'
import Rating from '../Rating'
import Count from '../Count'
import { MdOutlineFavoriteBorder } from "react-icons/md";
import AddToCartBtn from '../AddToCartBtn'

export default function ProductDetails(){
    const params = useParams()
    const {id} = params

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState({})

    useEffect(()=> {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/id/${id}`)
                setProduct(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        
        if(id){
            fetchProduct()
        }
        
    },[id])

    const addToCart = async () => {
        try {
            setItem({produtID: product._id})
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/cart`, {
                body: item,
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = response.data
            console.log(data)

        } catch (error) {
            console.error(error)
        }
    }

    if(loading) return <main style={{padding: '6rem'}}> <Loading /> </main>

    return(
        <main className="product-detail-page">
            <div className="container">
                <div className="img-container">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-detail">
                    <div className="heading">
                        <div className="brand">{product.brand}</div>
                        <div className="stock">
                            {product.countInStock > 0 ? 
                                <span style={{backgroundColor: 'hsl(223, 64%, 98%)', color: 'hsl(120, 70%, 50%)'}}>In Stock</span>
                                : 
                                <span style={{backgroundColor: 'hsl(223, 64%, 98%)', color: '#ccc'}}>Out of Stock</span>
                            }
                        </div>
                    </div>
                    <div className="name">{product.name}</div>
                    <Rating rating={product.rating}/>
                    <div className="price">
                        <span className='selling-price'>${product.price}</span>
                        <span className='cost-price'>${product.price + ((10/100) * product.price)}</span>
                    </div>
                    <div className="description">{product.description}</div>
                    <div className="add-to-cart">
                        <Count />
                        <div className="btn-container">
                            <AddToCartBtn />
                            {/* <button 
                                className='add-to-cart-btn'
                                type='submit'
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button> */}
                            <div className="favorite-btn">
                                <button className='add-to-favourite'> <MdOutlineFavoriteBorder size={22}/> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="review-container"></div>
        </main>
    )
}