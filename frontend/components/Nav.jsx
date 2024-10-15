import { IoClose } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUX } from "@/utils/context/ux/uxContext";

export default function Nav() {
    const [subNavActive, setSubNavActive] = useState(false);
    const { state, dispatch } = useUX();

    useEffect(() => {
        const body = document.body;

        const handleClickOutside = (e) => {
            const target = e.target;

            if (state.isSideBarOpen && (target.tagName === 'A')) {
                dispatch({ type: 'TOGGLE_SIDEBAR' });
            }

            if (state.isCartOpen && (target.tagName === 'A' || target.tagName === 'BUTTON')) {
                dispatch({ type: 'TOGGLE_CART' });
            }

            if (state.isModalOpen && (target.tagName === 'A' || target.tagName === 'BUTTON')) {
                dispatch({ type: 'TOGGLE_MODAL' });
            }

            if ((state.isModalOpen || state.isCartOpen || state.isSideBarOpen) && target.className === 'overlay'){
                dispatch({ type: 'TOGGLE_MODAL' })
                dispatch({ type: 'TOGGLE_SIDEBAR' })
                dispatch({ type: 'TOGGLE_CART' })
            }
        };

        body.addEventListener('click', handleClickOutside);

        return () => {
            body.removeEventListener('click', handleClickOutside);
        };
    }, [state.isSideBarOpen, state.isModalOpen, state.isCartOpen, dispatch]);


    return (
        <nav className={`nav ${state.isSideBarOpen ? 'nav-active' : 'nav'}`}> 
            <div className="close-nav" onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}>
                <IoClose size={25} className="close-icon" />
            </div>
            <ul className="nav-list">
                <li className="link">
                    <Link href='/'>Home</Link>
                </li>
                <ul className="link">
                    <div className='shop-link' onClick={() => setSubNavActive(!subNavActive)}>
                        <span>Shop</span> 
                        {!subNavActive && <FaAngleDown />} 
                        {subNavActive && <FaAngleUp />}
                    </div>
                    <div className={`shop-link-mobile ${subNavActive ? 'shop-mobile-active' : 'shop-link-mobile'}`}>
                        <li className="link">
                            <Link href='/shop/men/?category=men'>Men</Link>
                        </li>
                        <li className="link">
                            <Link href='/shop/women/?category=women'>Women</Link>
                        </li>
                        <li className="link">
                            <Link href='/shop/watches?category=wristwatch'>Watches</Link>
                        </li>
                        <li className="link">
                            <Link href='/shop/footwears/?category=footwear'>Footwears</Link>
                        </li>
                    </div>
                </ul>
                <li className="link">
                    <Link href='/our-story'>Our Story</Link>
                </li>
                <li className="link">
                    <Link href='/blog'>Blog</Link>
                </li>
                <li className="link">
                    <Link href='/contact-us'>Contact Us</Link>
                </li>
            </ul>
        </nav>
    ); 
} 
