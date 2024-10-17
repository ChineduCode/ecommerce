import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import AddToWishlist from "./AddToWishlist";

export default function Bestsellers({ product }){
    return(
        <div className="best-seller product">
            <div className="img-container">
                <Link href={`/products/${product._id}`} className="img">
                    <img src={product.image} alt={product.brand} />
                </Link>
                <div className="right-bar">
                    <AddToWishlist productId={product._id} />
                </div>
            </div>

            <div className="product-info">
                <Link href={`/products/${product._id}`} className="product-info">
                    <h3 className="brand">{product.brand}</h3>
                    <div className="name">{product.name}</div>
                    <div className="selling-cost-prices">
                        <span className='selling-price'>${product.price - ((10/100) * product.price)}</span>
                        <span className='cost-price'>${product.price}</span>
                    </div>
                </Link>
                <div className="add-to-cart-btn">
                    <AddToCartBtn productId={product._id} />
                </div>
            </div>
        </div>
    )
}
