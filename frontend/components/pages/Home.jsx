'use client'

import Link from "next/link"
import { FaArrowRightLong, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

export default function Home(){
    const categoryRef = useRef(null)
    const [ isStart, setIsStart ] = useState(true)
    const [ isEnd, setIsEnd ] = useState(false)

    //Handle scroll
    const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current
        setIsStart(scrollLeft === 0)
        setIsEnd(scrollLeft + clientWidth >= scrollWidth)
    }
    //Scroll to left or right
    const scroll = (direction) => {
        const { current } = categoryRef
        const scrollAmount = 300
        if(direction === 'left'){
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }else{
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }
    //Add scroll event listener
    useEffect(() => {
        const { current } = categoryRef;
        current.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => current.removeEventListener('scroll', handleScroll);
    }, []);


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
                    <button 
                        className='prev' 
                        onClick={() => scroll('left')}
                        disabled={isStart}
                        style={{ backgroundColor: isStart ? '#ccc' : 'hsl(220, 13%, 13%)' }}
                    > 
                        <FaArrowLeft size={22}/> 
                    </button>

                    <button 
                        className='next' 
                        onClick={() => scroll('right')}
                        disabled={isEnd}
                        style={{ backgroundColor: isEnd ? '#ccc' : 'hsl(220, 13%, 13%)' }}
                    > 
                        <FaArrowRight size={22}/> 
                    </button>
                </div>
            </section>
        </main>
    )
}
