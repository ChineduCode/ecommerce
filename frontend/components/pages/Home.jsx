import Link from "next/link"
import { FaArrowRightLong, FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Home(){
    return(
        <main className="homepage">
            <section className="hero-section">
                <div className="img-container">
                    {/* <img src="/web-images/hero-img.jpg" alt="hero-img" className='mobile-img'/> */}
                    <img src="/web-images/hero-img2.png" alt="heri-img" />
                </div>
                <div className="text-container">
                    <div className="header">Classic Exclusive</div>
                    <h2 className="collection">Unisex Collection</h2>
                    <div className="discount">UPTO 40% OFF</div>
                    <button className="cta-btn">
                        <Link href='/shop'><span>Shop Now</span> <FaArrowRightLong /></Link>
                    </button>
                </div>
            </section>

            <section className="shop-by-categories">
                <div className="header">
                    <h2 className="heading">Shop by Categories</h2>
                    <div className="prev-next-btn">
                        <button className='prev'> <FaAngleLeft /> </button>
                        <button className='next'> <FaAngleRight /> </button>
                    </div>
                </div>
                {/* <div className="content">
                    <div className="img-container"> img </div>
                </div> */}
            </section>
        </main>
    )
}
