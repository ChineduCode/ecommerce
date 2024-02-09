import { FaBars, FaCartShopping } from 'react-icons/fa6'
import Link from 'next/link'
import Nav from './Nav'
import Avatar from './Avatar'

export default function Header(){
    return(
        <header>
            <div className="hamburger-logo-nav">
                <div className="hamburger-logo">
                    <FaBars size={22}/>
                    <Link href={'/'} className="logo"> <img src="/logo.svg" alt="logo" /> </Link>
                </div>
                <Nav />
            </div>

            <div className="cart-avatar">
                <div className="cart-container">
                    <FaCartShopping  size={20}/>
                    <small className="cart-number-of-items">3</small>
                </div>
                <Avatar />
            </div>
        </header>
    )
}