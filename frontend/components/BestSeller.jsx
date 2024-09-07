import { MdOutlineFavoriteBorder } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";

export default function Bestsellers({ product }){
    return(
        <div className="best-seller product">
            <Link href={`/shop/${product._id}`} className="img-container">
                <div className="img">
                    <img src={product.image} alt={product.brand} />
                </div>
                <div className="img-cover">
                    <div className="right-bar">
                        <MdOutlineFavoriteBorder size={25}/>
                        <LuEye size={25}/>
                    </div>
                    <AddToCartBtn />
                </div>
            </Link>

            <Link href={`/shop/${product._id}`} className="product-info">
                <h3 className="brand">{product.brand}</h3>
                <div className="name">{product.name}</div>
                <div className="selling-cost-prices">
                    <span className='selling-price'>${product.price - ((10/100) * product.price)}</span>
                    <span className='cost-price'>${product.price}</span>
                </div>
            </Link>
        </div>
    )
}
