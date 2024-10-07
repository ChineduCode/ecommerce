import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { FaRegUser, FaArrowLeftLong, FaAngleLeft } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrLocation, GrFavorite, GrCreditCard } from "react-icons/gr";
import { PiBellLight } from "react-icons/pi";
import { MdChevronRight } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProfileLayout({ children }){
    const session = await getServerSession(authOptions)

    const profileLinks = [
        { name: 'Profile Information', link: '/profile', inlineLink: '#profile', icon: <FaRegUser size={22}/> },
        { name: 'My Orders', link: '/profile/orders', inlineLink: '#orders', icon: <HiOutlineShoppingBag size={22} /> },
        { name: 'My Wishlists', link: '/profile/wishlists', inlineLink: '#wishlists', icon: <GrFavorite size={22}/> },
        { name: 'Manage Addresses', link: '/profile/addresses', inlineLink: '#addresses', icon: <GrLocation size={22}/> },
        { name: 'Notifications', link: '/profile/notifications', inlineLink: '#notifications', icon: <PiBellLight size={22}/> },
        { name: 'Settings', link: '/profile/settings', inlineLink: '#settings', icon: <BsGear size={22}/> },
    ];

    return(
        <div className='wrapper'>
            <Header />
            <main className='profile-page-layout'>
                <h1>My Profile</h1>
                <div className='profile-container'>
                    {/* <ProfileSideBar /> */}
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
                                <div className="hello">Hello 👋</div>
                                <div className="name">{`${session?.user.firstname} ${session?.user.lastname}`}</div>
                            </div>
                        </div>
                        <ul className="links">
                            { profileLinks.map((profile, index) => (
                                <li key={index}>
                                    <Link href={`${profile.link}${profile.inlineLink}`}>
                                        <span className='icon'>
                                            {profile.icon} <span>{profile.name}</span>
                                        </span>
                                        <MdChevronRight size={22}/>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                    { children }
                </div>
            </main>
            <Footer />
        </div>
    )
}
