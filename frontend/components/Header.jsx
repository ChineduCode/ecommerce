'use client'

import { useState } from 'react'
import Link from "next/link"
import { IoMenu, IoSearch, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import Nav from "./Nav";
import Cart from './Cart';

export default function Header(){
    const [ navActive, setNavActive ] = useState(false)
    const [ cartActive, setCartActive ] = useState(false)

    return(
        <header className='header'>
            <div className="logo-container"> <Link href='/' className="logo">Shop</Link> </div>
            <Nav navActive={navActive} setNavActive={setNavActive} />
            <div className="secondary-nav-menu">
                <div className="icons-btn-login">
                    <div className="icons">
                        <IoSearch size={22}/>
                        <IoHeartOutline size={22}/>
                        <IoCartOutline size={22} onClick={()=> setCartActive(!cartActive)}/>
                    </div>

                    {cartActive && <Cart />}

                    <button className="btn-login"> <Link href='/login'>Login</Link> </button>
                </div>
                <div className="menu-bar" onClick={()=> setNavActive(true)}> <IoMenu size={25}/> </div>
            </div>
            <div className={`overlay ${navActive ? 'overlay-active' : 'overlay'}`}></div>
        </header>
    )
}
