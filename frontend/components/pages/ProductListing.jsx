'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Loading from '../Loading';
import Link from 'next/link'
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { LuEye } from "react-icons/lu";

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
                console.log(products)
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
                            <Link href={`/products/${product._id}`} className="img-container">
                                <div className="img">
                                    <img src={product.image} alt={product.brand} />
                                </div>
                                <div className="img-cover">
                                    <div className="right-bar">
                                        <MdOutlineFavoriteBorder size={25}/>
                                        <LuEye size={25}/>
                                    </div>
                                    <div className="btn-add-to-cart"> <button className='btn'>Add to Cart</button> </div>
                                </div>
                            </Link>

                            <Link href={`/products/${product._id}`} className="product-info">
                                <h3 className="brand">{product.brand}</h3>
                                <div className="name">{product.name}</div>
                                <div className="selling-cost-prices">
                                    <span className='selling-price'>${product.price}</span>
                                    <span className='cost-price'>${product.price + ((10/100) * product.price)}</span>
                                </div>
                            </Link>
                        </div>
                    ))

                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </main>
    );
}
