import Link from "next/link"
import { FaRegUser, FaBagShopping } from "react-icons/fa6";
import { GrLocation, GrFavorite, GrCreditCard } from "react-icons/gr";
import { PiBellLight } from "react-icons/pi";
import { BsGear } from "react-icons/bs";

export default function ProfileSideBar(){
    return(
        <aside className="profile-side-bar">
            <ul className="links">
                <li>
                    <Link href='/profile'>
                        <span>Personal Information</span> <FaRegUser size={22}/>
                    </Link>
                </li>
                <li>
                    <Link href='/profile/orders'>
                        <span>My Orders</span> <FaBagShopping />
                    </Link>
                </li>
                <li>
                    <Link href='/profile/wishlists'>
                        <span>My Wishlists</span> <GrFavorite />
                    </Link>
                </li>
                <li>
                    <Link href='/profile/addresses'>
                        <span>My Address</span> <GrLocation />
                    </Link>
                </li>
                <li>
                    <Link href='/profile/payment-method'>
                        <span>Saved Cards</span> <GrCreditCard />
                    </Link>
                </li>
                <li>
                    <Link href='/profile/notifications'>
                        <span>Notifications</span> <PiBellLight />
                    </Link>
                </li>
                <li>
                    <Link href='/profile/settings'>
                        <span>Settings</span> <BsGear />
                    </Link>
                </li>
            </ul>
        </aside>
    )
}
