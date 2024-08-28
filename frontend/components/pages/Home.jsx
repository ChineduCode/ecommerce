'use client'

import Link from "next/link"
import { FaArrowRightLong, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

export default function Home(){
    //const [category, setCategory] = useState()
    const categoryRef = useRef(null)

    const handlePrevClick = ()=> {
        if(categoryRef.current){
            categoryRef.current.scrollBy({
                left: -200,
                behavior: 'smooth'
            })
        }
    }
    const handleNextClick = ()=> {
        if(categoryRef.current){
            categoryRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            })
        }
    }

    return(
        <main className="homepage">
            <section className="hero-section">
                <div className="img-container">
                    <img src="/static-images/hero-img2.png" alt="heri-img" />
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
                <h2 className="heading">Shop by Categories</h2>
                <div className="categories-container" ref={categoryRef}>
                    <Link href='/products/categories/?category=men' className="container men">
                        <div className="img-container"> <img src="/static-images/men_tshirt6.png" alt="men category" /> </div>
                        <div className="text-container">Men</div>
                    </Link>
                    <Link href='/products/categories/?category=women' className="container women">
                        <div className="img-container"> <img src="/static-images/women_top5.png" alt="women category" /> </div>
                        <div className="text-container">Women</div>
                    </Link>
                    <Link href='/products/categories/?category=footwear' className="container footwear">
                        <div className="img-container"> <img src="/static-images/women_sneaker4.png" alt="footwear" /> </div>
                        <div className="text-container">Footwear</div>
                    </Link>
                    <Link href='/products/categories/?category=wristwatch' className="container wrist-watch">
                        <div className="img-container"> <img src="/static-images/men_wristwatch5.png" alt="wrist-watch category" /> </div>
                        <div className="text-container">Wrist Watch</div>
                    </Link>
                    <Link href='/products/categories/?category=bag' className="container bag">
                        <div className="img-container"> <img src="/static-images/men_handbag.png" alt="bag" /> </div>
                        <div className="text-container">Bags</div>
                    </Link>
                    <Link href='/products/categories/?category=cap' className="container cap">
                        <div className="img-container"> <img src="/static-images/women_cap.png" alt="cap" /> </div>
                        <div className="text-container">Caps</div>
                    </Link>
                </div>
                <div className="prev-next-btn">
                    <button className='prev' onClick={handlePrevClick}> <FaAngleLeft size={22}/> </button>
                    <button className='next' onClick={handleNextClick}> <FaAngleRight size={22}/> </button>
                </div>
            </section>
        </main>
    )
}
