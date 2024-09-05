'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ProductListing() {
    const params = useParams()
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log(params)
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [params]);

    if (loading) return <main>Loading...</main>;

    return (
        <main className="product-listing">
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product._id} className="product">
                        {product.name}
                    </div>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </main>
    );
}
