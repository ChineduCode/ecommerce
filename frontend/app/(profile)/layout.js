import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProfileSideBar from "@/components/ProfileSideBar"

export default function ProfileLayout({ children }){
    return(
        <div className='wrapper'>
            <Header />
            <main className='profile-page'>
                <h1>My Profile</h1>
                <div className='profile-container'>
                    <ProfileSideBar />
                    { children }
                </div>
            </main>
            <Footer />
        </div>
    )
}
