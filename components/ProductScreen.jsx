import AddMinusBtn from './Add_Minus_Btn'
import AddToCartBtn from './AddToCartBtn'
import Rating from './Rating'

const fetchProduct = async (id)=> {
    const apiUrl = process.env.api_url
    const res = await fetch(`${apiUrl}/api/products`, {next: {revalidate: 10}})
    const data = await res.json()
    //return single product
    const product = data.find(p => p._id == id)
    return product;
}

export default async function ProductScreen({ id }){
    const product = await fetchProduct(id)

    return(
        <div className="product-screen">
            <div className="container">
                <div className="hero-img">
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="text-container">
                    <h1 className="name">{product.name}</h1>
                    <div className="description">{product.description}</div>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    <h1 className="price-container">${product.price}</h1>
                    <div className="count-in-stock">
                        {product.countInStock > 0 ?  `${product.countInStock} in stock` : 'Out of stock'}
                    </div>
                    <AddMinusBtn />
                    <AddToCartBtn product={product}/>
                </div>
            </div>
        </div>
    )
}