import { IoClose } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";

export default function Nav({ navActive, setNavActive }){
    useEffect(()=> {
        console.log(navActive)
    },[navActive])
    return(
        <nav className={`nav ${navActive ? 'nav-active' : 'nav'}`}>
            <div className="close-nav" onClick={()=> setNavActive(false)}> <IoClose size={25}/> </div>
            <ul className="nav-list">
                <li className="link"> <Link href='/'>Home</Link> </li>
                <ul className="link">
                    <div className='shop-link'> <span>Shop</span> <FaAngleDown /> <FaAngleUp /> </div>
                    <div className="shop-link-mobile">
                        <li> <Link href='/shop/men'>Men</Link> </li>
                        <li> <Link href='/shop/women'>Women</Link> </li>
                        <li> <Link href='/shop/watches'>Watches</Link> </li>
                        <li> <Link href='/shop/footwears'>Footwears</Link> </li>
                    </div>
                </ul>
                <li className="link"> <Link href='/our-story'>Our Story</Link> </li>
                <li className="link"> <Link href='/blog'>Blog</Link> </li>
                <li className="link"> <Link href='/contact-us'>Contact Us</Link> </li>
            </ul>
        </nav>
    )
}
