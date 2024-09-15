'use client'

import { useState } from 'react'
import Link from "next/link"
import { IoMenu, IoSearch, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { FaRegUser } from 'react-icons/fa6';
import Nav from "./Nav";
import Cart from './Cart';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/auth/AuthContext';

export default function Header(){
    const [ navActive, setNavActive ] = useState(false)
    const [ cartActive, setCartActive ] = useState(false)
    const { session } = useAuth()
    const router = useRouter()

    const handleCartClick = ()=> {
        if(!session){
            return router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
        }
        setCartActive(!cartActive)
    }

    return(
        <header className='header'>
            <div className="logo-container"> <Link href='/' className="logo">Shop</Link> </div>
            <Nav navActive={navActive} setNavActive={setNavActive} />
            <div className="secondary-nav-menu">
                <div className="icons-btn-login">
                    <div className="icons">
                        <IoSearch size={22}/>
                        <Link href='/profile/wishlists'> <IoHeartOutline size={22}/> </Link>
                        <IoCartOutline size={22} onClick={handleCartClick}/>
                    </div>

                    {cartActive && <Cart />}

                    {
                        session ? 
                            <Link href='/profile' className='profile-img-container'> 
                                {session?.user.image ?
                                    <img src={session.user.image} alt="user-avatar" /> 
                                    :
                                    <FaRegUser size={35}/>
                                }
                            </Link>
                        :   
                        <button className="btn-login"> <Link href='/login'>Login</Link> </button>
                    }
                    
                </div>
                <div className="menu-bar" onClick={()=> setNavActive(true)}> <IoMenu size={25}/> </div>
            </div>
            <div className={`overlay ${navActive ? 'overlay-active' : 'overlay'}`}></div>
        </header>
    )
}
