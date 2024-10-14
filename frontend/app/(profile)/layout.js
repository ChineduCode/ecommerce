import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { FaRegUser } from "react-icons/fa6";
import { getServerSession } from "next-auth";
import ProfileSideBarLinks from "@/components/ProfileSideBarLinks";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProfileLayout({ children }){
    const session = await getServerSession(authOptions)

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
                        <ProfileSideBarLinks />
                    </aside>
                    { children }
                </div>
            </main>
            <Footer />
        </div>
    )
}
