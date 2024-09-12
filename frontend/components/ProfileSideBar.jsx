import Link from "next/link"
import { FaRegUser, FaBagShopping, FaArrowLeftLong, FaAngleLeft } from "react-icons/fa6";
import { GrLocation, GrFavorite, GrCreditCard } from "react-icons/gr";
import { PiBellLight } from "react-icons/pi";
import { MdChevronRight } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProfileSideBar(){
    const session = await getServerSession(authOptions)
    const profileLinks = [
        {
            name: 'Profile Information',
            link: '/profile',
            icon: <FaRegUser size={22}/>
        },
        {
            name: 'My Orders',
            link: '/profile/orders',
            icon: <FaBagShopping size={22}/>
        },
        {
            name: 'My Wishlists',
            link: '/profile/wishlists',
            icon:  <GrFavorite size={22}/>
        },
        {
            name: 'Manage Addresses',
            link: '/profile/addresses',
            icon: <GrLocation size={22}/>
        },
        {
            name: 'Saved Cards',
            link: '/profile/payment-method',
            icon: <GrCreditCard />
        },
        {
            name: 'Notifications',
            link: '/profile/notifications',
            icon: <PiBellLight size={22}/>
        },
        {
            name: 'Settings',
            link: '/profile/settings',
            icon: <BsGear size={22}/>
        },
    ]

    return(
        <aside className="profile-side-bar">
            <div className='profile-info-container'>
                <div className='profile-img-container'> 
                    {session?.user.image ?
                        <img src={session.user.image} alt="user-avatar" /> 
                        :
                        <FaRegUser size={40}/>
                    }
                </div>
                <div className="profile-info">
                    <div className="name">{session?.user.firstname}</div>
                    <div className="email">{session?.user.email}</div>
                </div>
            </div>
            <ul className="links">
                { profileLinks.map((profile, index) => (
                    <li key={index}>
                        <Link href={profile.link}>
                            <span className='icon'>
                                {profile.icon} <span>{profile.name}</span>
                            </span>
                            <MdChevronRight size={22}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
