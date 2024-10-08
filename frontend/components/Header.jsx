'use client'

import Link from "next/link"
import { IoMenu, IoSearch, IoHeartOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from 'react-icons/fa6';
import Nav from "./Nav";
import MiniCart from "./MiniCart";
import { useRouter } from 'next/navigation';
import { useUX } from '@/utils/context/ux/uxContext';
import { useSession } from "next-auth/react";

export default function Header(){
    const { data: session } = useSession()
    const { state, dispatch } = useUX()

    const router = useRouter()

    const handleCartClick = ()=> {
        if(!session){
            return router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
        }
        dispatch({type: 'TOGGLE_CART'})
    }

    return(
        <header className='header'>
            <div className="logo-container"> <Link href='/' className="logo">Shop</Link> </div>
            <Nav />
            <div className="secondary-nav-menu">
                <div className="icons-btn-login">
                    <div className="icons">
                        <IoSearch size={22}/>
                        <Link href='/profile/wishlists'> <IoHeartOutline size={22}/> </Link>
                        <HiOutlineShoppingBag size={22} onClick={handleCartClick}/>
                    </div>

                    {state.isCartOpen && <MiniCart />}

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
                <div className="menu-bar" onClick={()=> dispatch({type: 'TOGGLE_SIDEBAR'})}> <IoMenu size={25}/> </div>
            </div>

            {(state.isSideBarOpen || state.isCartOpen || state.isModalOpen) && <div className='overlay'></div>}
        </header>
    )
}
