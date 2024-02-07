import { FaXmark } from 'react-icons/fa6'
import Link from 'next/link'

export default function Nav(){
    return(
        <nav>
            <FaXmark />
            <ul className="nav-links">
                <li> <Link href={'/collections'}>Collections</Link> </li>
                <li> <Link href={'/men'}>Men</Link> </li>
                <li> <Link href={'women/'}>Women</Link> </li>
                <li> <Link href={'/about'}>About</Link> </li>
                <li> <Link href={'/contact'}>Contact</Link> </li>
            </ul>
        </nav>
    )
}