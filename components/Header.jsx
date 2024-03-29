"use client"

import { useState } from 'react'
import { FaBars, FaCartShopping } from 'react-icons/fa6'
import Link from 'next/link'
import Nav from './Nav'
import Avatar from './Avatar'
import Cart from './Cart'

export default function Header(){
    let [navActive, setNavActive] = useState(false)
    let [cartActive, setCartActive] = useState(false)

    return(
        <header>
            <div className="hamburger-logo-nav">
                <div className="hamburger-logo">
                    <FaBars size={22} onClick={()=> setNavActive(true)}/>
                    <Link href={'/'} className="logo"> <img src="/logo.svg" alt="logo" /> </Link>
                </div>
                <Nav navActive={navActive} setNavActive={setNavActive}/>
            </div>

            <div className="cart-avatar">
                <div className="cart-icon-container" onClick={()=> setCartActive(cartActive = !cartActive, console.log(cartActive))}>
                    <FaCartShopping  size={20}/>
                    <small className="cart-number-of-items">3</small>
                </div>
                <Cart cartActive={cartActive}/>
                <Avatar />
            </div>
        </header>
    )
}