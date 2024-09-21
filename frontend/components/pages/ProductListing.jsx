'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Loading from '../Loading';
import Link from 'next/link'
import AddToWishlist from '../AddToWishlist';
import AddToCartBtn from '../AddToCartBtn';

export default function ProductListing() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams()
    const category = searchParams.get('category') || ''
    const subCategory = searchParams.get('subCategory') || ''
    const brand = searchParams.get('brand') || ''

    const params = { category, subCategory, brand }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`
                if(category || subCategory || brand){
                    url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/categories/`
                }
                const response = await axios.get(url, {params})
                setProducts(response.data)

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [setProducts]);

    if (loading) return <main style={{padding: '6rem'}}> <Loading /> </main>;

    return (
        <main className="product-listing-page product-list">
            <div className="containers">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className="product">
                            <div className="img-container">
                                <Link href={`/products/${product._id}`} className="img">
                                    <img src={product.image} alt={product.brand} />
                                </Link>
                                <div className="right-bar">
                                    <AddToWishlist productId={product._id} />
                                    {/* <button> <LuEye size={25}/> </button> */}
                                </div>
                            </div>
                            
                            <div className="product-info">
                                <Link href={`/products/${product._id}`}>
                                    <h3 className="brand">{product.brand}</h3>
                                    <div className="name">{product.name}</div>
                                    <div className="selling-cost-prices">
                                        <span className='selling-price'>${product.price}</span>
                                        <span className='cost-price'>${product.price + ((10/100) * product.price)}</span>
                                    </div>
                                </Link>
                                <div className="btn-add-to-cart">
                                    <AddToCartBtn productId={product._id}/> 
                                </div>
                            </div>
                        </div>
                    ))

                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </main>
    );
}
