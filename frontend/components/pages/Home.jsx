'use client'

import Link from "next/link"
import { FaArrowRightLong, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Bestsellers from "../BestSeller";
import customerReviews from "@/data/customer-reviews";
import CustomerReview from "../CustomerReview";
import Loading from "../Loading";

export default function Home(){
    const categoryRef = useRef(null)
    const customerReviewsRef = useRef(null)

    const [ isStart, setIsStart ] = useState(true)
    const [ isEnd, setIsEnd ] = useState(false)
    const [ bestsellers, setBestSellers ] = useState([])
    const [ loading, setLoading ] = useState(true)


    // //Handle scroll for category container
    const handleCategoryScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current
        setIsStart(scrollLeft === 0)
        setIsEnd(scrollLeft + clientWidth >= scrollWidth)
    }
    //Scroll to left or right for category container
    const scrollCategory = (direction) => {
        const { current } = categoryRef
        const scrollAmount = 300
        if(direction === 'left'){
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }else{
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }


    // //Handle scroll for customer review
    const handleReviewScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = customerReviewsRef.current
        setIsStart(scrollLeft === 0)
        setIsEnd(scrollLeft + clientWidth >= scrollWidth)
    }
    //Scroll to left or right for customer review
    const scrollReview = (direction) => {
        const { current } = customerReviewsRef
        console.log('clicked')
        const scrollAmount = 300
        if(direction === 'left'){
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }else{
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }


    //Add scroll event listener for category container
    useEffect(() => {
        const { current } = categoryRef;
        current.addEventListener('scroll', handleCategoryScroll);
        handleCategoryScroll(); // Initial check

        return () => current.removeEventListener('scroll', handleCategoryScroll);
    }, []);

    //Add scroll event listener for customers review
    useEffect(() => {
        const { current } = customerReviewsRef;
        current.addEventListener('scroll', handleReviewScroll);
        handleReviewScroll(); // Initial check

        return () => current.removeEventListener('scroll', handleReviewScroll);
    }, []);

    //Fetching bestsellers data
    useEffect(()=> {
        const fetchBestSellers = async () =>{
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/bestsellers`)
                setBestSellers(response.data)
                
            } catch (error) {
                console.error('Error fetching products')
            } finally {
                setLoading(false)
            }
        }

        fetchBestSellers()
    }, [])


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
                    <Link href='/shop/categories/?category=men' className="container men">
                        <div className="img-container"> <img src="/static-images/men_tshirt6.png" alt="men category" /> </div>
                        <div className="text-container">Men</div>
                    </Link>
                    <Link href='/shop/categories/?category=women' className="container women">
                        <div className="img-container"> <img src="/static-images/women_top5.png" alt="women category" /> </div>
                        <div className="text-container">Women</div>
                    </Link>
                    <Link href='/shop/categories/?category=footwear' className="container footwear">
                        <div className="img-container"> <img src="/static-images/women_sneaker4.png" alt="footwear" /> </div>
                        <div className="text-container">Footwear</div>
                    </Link>
                    <Link href='/shop/categories/?category=wristwatch' className="container wrist-watch">
                        <div className="img-container"> <img src="/static-images/men_wristwatch5.png" alt="wrist-watch category" /> </div>
                        <div className="text-container">Wrist Watch</div>
                    </Link>
                    <Link href='/shop/categories/?category=bag' className="container bag">
                        <div className="img-container"> <img src="/static-images/men_handbag.png" alt="bag" /> </div>
                        <div className="text-container">Bags</div>
                    </Link>
                    <Link href='/shop/categories/?category=cap' className="container cap">
                        <div className="img-container"> <img src="/static-images/women_cap.png" alt="cap" /> </div>
                        <div className="text-container">Caps</div>
                    </Link>
                </div>
                <div className="prev-next-btn">
                    <button 
                        className='prev' 
                        onClick={() => scrollCategory('left')}
                        disabled={isStart}
                        style={{ backgroundColor: isStart ? '#ccc' : 'hsl(220, 13%, 13%)' }}
                    > 
                        <FaArrowLeft size={22}/> 
                    </button>

                    <button 
                        className='next' 
                        onClick={() => scrollCategory('right')}
                        disabled={isEnd}
                        style={{ backgroundColor: isEnd ? '#ccc' : 'hsl(220, 13%, 13%)' }}
                    > 
                        <FaArrowRight size={22}/> 
                    </button>
                </div>
            </section>

            <section className="best-sellers product-list">
                <h2 className="heading">Our Bestseller</h2>
                { loading ? <Loading /> :
                    <div className="containers">
                        { bestsellers.map(product => 
                            <Bestsellers 
                                key={product.brand} 
                                product={product} 
                            />)
                        }
                    </div>
                }
            </section>

            <section className="all-products">
                <div className="description-container">
                    <h2 className='heading'>Deals of the Month</h2>
                    <div className="description">
                        Discover exceptional value and quality, 
                        and enjoy the thrill of shopping with amazing savings. 
                        Don't miss out — these deals are available only for a 
                        limited time and while stocks last. Make sure to check back regularly, 
                        as new deals and surprises await you every month!
                    </div>
                    <div className="count-down">
                        <div className="days time">
                            <div className="num">120</div>
                            <div className="text">Days</div>
                        </div>
                        <div className="hours time">
                            <div className="num">18</div>
                            <div className="text">Hours</div>
                        </div>
                        <div className="mins time">
                            <div className="num">15</div>
                            <div className="text">Mins</div>
                        </div>
                        <div className="secs time">
                            <div className="num">10</div>
                            <div className="text">Secs</div>
                        </div>
                    </div>

                    <button className='all-products-btn'>
                        <Link href='/shop'> <span>View All Products</span> <FaArrowRightLong /> </Link>
                    </button>
                </div>
                <div className="img-container">
                    <img src="/static-images/allproduct.png" alt="all-products-img" />
                </div>
            </section>

            <section className="customers-review">
                <h2 className="heading">What's our Customer say's</h2>
                <div className="customers-review-container" ref={customerReviewsRef}>
                    { customerReviews.map((review)=> 
                        <CustomerReview reviews={review} key={review.review}/>
                    )}
                </div>
                <div className="prev-next-btn">
                    <button 
                        className='prev' 
                        onClick={() => scrollReview('left')}
                        disabled={isStart}
                        style={{ backgroundColor: isStart ? '#ccc' : 'hsl(220, 13%, 13%)' }}
                    > 
                        <FaArrowLeft size={22}/> 
                    </button>

                    <button 
                        className='next' 
                        onClick={() => scrollReview('right')}
                        disabled={isEnd}
                        style={{ backgroundColor: isEnd ? '#ccc' : 'hsl(220, 13%, 13%)' }}
                    > 
                        <FaArrowRight size={22}/> 
                    </button>
                </div>
            </section>

            {/* <section className="instagram-stories">
                <h2 className="heading">Our Instagram Stories</h2>
            </section> */}
        </main>
    )
}
