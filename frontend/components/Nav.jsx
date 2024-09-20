import { IoClose } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useUX } from "@/utils/context/ux/uxContext";

export default function Nav(){
    const [ subNavActive, setSubNavActive ] = useState(false)
    const { state, dispatch } = useUX()

    return(
        <nav className={`nav ${state.isSideBarOpen ? 'nav-active' : 'nav'}`}>
            <div className="close-nav" onClick={()=> dispatch({type: 'TOGGLE_SIDEBAR'})}> <IoClose size={25}/> </div>
            <ul className="nav-list">
                <li className="link"> <Link href='/'>Home</Link> </li>
                <ul className="link">
                    <div className='shop-link' onClick={()=> setSubNavActive(!subNavActive)}>
                        <span>Shop</span> { !subNavActive && <FaAngleDown /> } { subNavActive && <FaAngleUp /> }
                    </div>
                    <div className={`shop-link-mobile ${subNavActive ? 'shop-mobile-active' : 'shop-link-mobile'}`}>
                        <li className="link"> <Link href='/shop/men/?category=men'>Men</Link> </li>
                        <li className="link"> <Link href='/shop/women/?category=women'>Women</Link> </li>
                        <li className="link"> <Link href='/shop/watches?category=wristwatch'>Watches</Link> </li>
                        <li className="link"> <Link href='/shop/footwears/?category=footwear'>Footwears</Link> </li>
                    </div>
                </ul>
                <li className="link"> <Link href='/our-story'>Our Story</Link> </li>
                <li className="link"> <Link href='/blog'>Blog</Link> </li>
                <li className="link"> <Link href='/contact-us'>Contact Us</Link> </li>
            </ul>
        </nav>
    )
}
