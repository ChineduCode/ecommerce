'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Products(){
    const [products, setProducts] = useState([])

    useEffect(()=> {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`)
                const data = response.data
                setProducts(data)
                console.log(products)
            } catch (error) {
                console.error(error)
            }
        }

        fetchAllProducts()
    }, [setProducts])

    return(
        <main className="products-page">
            {products.map(product => (
                <div className="product" key={product.image}> {product.name} </div>
            ))}
        </main>
    )
}
