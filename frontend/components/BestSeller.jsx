import { MdOutlineFavoriteBorder } from "react-icons/md";
import { LuEye } from "react-icons/lu";

export default function Bestsellers({ bestseller }){
    return(
        <div className="best-seller">
            <div className="img-container">
                <div className="img">
                    <img src={bestseller.image} alt={bestseller.brand} />
                </div>
                <div className="img-cover">
                    <div className="right-bar">
                        <MdOutlineFavoriteBorder size={25}/>
                        <LuEye size={25}/>
                    </div>
                    <div className="btn-add-to-cart"> <button className='btn'>Add to Cart</button> </div>
                </div>
            </div>

            <div className="product-info">
                <h3 className="brand">{bestseller.brand}</h3>
                <div className="name">{bestseller.name}</div>
                <div className="selling-cost-prices">
                    <span className='selling-price'>${bestseller.price - ((10/100) * bestseller.price)}</span>
                    <span className='cost-price'>${bestseller.price}</span>
                </div>
            </div>
        </div>
    )
}
