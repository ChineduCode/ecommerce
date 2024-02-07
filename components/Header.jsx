import { FaBars, FaCartShopping } from 'react-icons/fa6'
import Link from 'next/link'
import Nav from './Nav'
import Avatar from './Avatar'

export default function Header(){
    return(
        <header>
            <div className="hamburger-logo-nav">
                <div className="hamburger-logo">
                    <FaBars />
                    <Link href={'/'} className="logo"> <img src="/logo.svg" alt="logo" /> </Link>
                </div>
                <Nav />
            </div>

            <div className="cart-avatar">
                <FaCartShopping />
                <Avatar />
            </div>
        </header>
    )
}