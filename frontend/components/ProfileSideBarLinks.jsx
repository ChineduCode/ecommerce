'use client'

import { useState, useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrLocation, GrFavorite } from "react-icons/gr";
import { PiBellLight } from "react-icons/pi";
import { MdChevronRight } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ProfileSideBarLinks(){
    const pageLinkRef = useRef(null)
    const router = useRouter()
    const pathname = usePathname()
    let [ currentPage, setCurrentPage ] = useState(0)

    const profileLinks = [
        { name: 'Profile Information', link: '/profile', inlineLink: '#profile', icon: <FaRegUser size={22}/> },
        { name: 'My Orders', link: '/profile/orders', inlineLink: '#orders', icon: <HiOutlineShoppingBag size={22} /> },
        { name: 'My Wishlists', link: '/profile/wishlists', inlineLink: '#wishlists', icon: <GrFavorite size={22}/> },
        { name: 'Manage Addresses', link: '/profile/addresses', inlineLink: '#addresses', icon: <GrLocation size={22}/> },
        { name: 'Notifications', link: '/profile/notifications', inlineLink: '#notifications', icon: <PiBellLight size={22}/> },
        { name: 'Settings', link: '/profile/settings', inlineLink: '#settings', icon: <BsGear size={22}/> },
    ];

    useEffect(() => {
        const currentPath = pathname.split('/')[2] || pathname.split('/')[1];
        const currentIndex = profileLinks.findIndex(link => link.link.includes(currentPath));
        setCurrentPage(currentIndex !== -1 ? currentIndex : 0);
    }, [pathname]);

    const handleLinkClick = (index) => {
        setCurrentPage(index)
    }
    
    return(
        <ul className="links">
            { profileLinks.map((profile, index) => (
                <li 
                    key={index} 
                    className={`profile-link ${currentPage === index ? 'profile-link-active': 'profile-link'}`}
                    onClick={()=> handleLinkClick(index)}
                >
                    <Link href={`${profile.link}${profile.inlineLink}`}>
                        <span className='icon'>
                            {profile.icon} <span>{profile.name}</span>
                        </span>
                        <MdChevronRight size={22}/>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
