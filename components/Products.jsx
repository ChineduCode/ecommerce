import Link from 'next/link'
import Rating from './Rating'

export default function Products({ product }){
    return(
        <div className="product">
            <Link href={`/products/${product._id}`}>
                <img src={product.imageUrl} alt="" />
                <div className="name"> <strong> {product.name} </strong> </div>
            </Link>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            <h3 className="price">${product.price}</h3>
        </div>
    )
}