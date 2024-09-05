'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from "react"
import axios from "axios"

export default function ProductDetails(){
    const params = useParams()
    const {id} = params

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/id/${id}`)
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

    return(
        <main className="product-details">
            <img src={product.image} alt="" />
        </main>
    )
}
