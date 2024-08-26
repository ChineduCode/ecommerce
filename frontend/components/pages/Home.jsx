import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home(){
    return(
        <main className="homepage">
            <div className="hero-section">
                <div className="img-container">
                    <img src="/web-images/hero-img.jpg" alt="" />
                </div>
                <div className="text-container">
                    <div className="header">Classic Exclusive</div>
                    <h2 className="collection">Unisex Collection</h2>
                    <div className="discount">UPTO 40% OFF</div>
                    <button className="cta-btn">
                        <Link href='/shop'><span>Shop Now</span> <FaArrowRightLong /></Link>
                    </button>
                </div>
            </div>
        </main>
    )
}
