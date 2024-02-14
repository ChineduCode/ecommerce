import { FaXmark } from 'react-icons/fa6'
import Link from 'next/link'

export default function Nav({ navActive, setNavActive }){
    return(
        <nav className={navActive ? 'nav-active' : 'nav'}>
            <FaXmark className='close-nav' onClick={()=> setNavActive(false)} size={22}/>

            <ul className="nav-links">
                <li className='nav-link'> <Link href={'/collections'}>Collections</Link> </li>
                <li className='nav-link'> <Link href={'/men'}>Men</Link> </li>
                <li className='nav-link'> <Link href={'women/'}>Women</Link> </li>
                <li className='nav-link'> <Link href={'/about'}>About</Link> </li>
                <li className='nav-link'> <Link href={'/contact'}>Contact</Link> </li>
            </ul>
        </nav>
    )
}