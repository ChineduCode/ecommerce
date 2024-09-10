import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProfileSideBar from "@/components/ProfileSideBar"
import Providers from "@/components/Provider"

export default async function ProfileLayout({ children }){
    return(
        <Providers>
            <div className='wrapper'>
                <Header />
                <main className='profile-page-layout'>
                    <h1>My Profile</h1>
                    <div className='profile-container'>
                        <ProfileSideBar />
                        { children }
                    </div>
                </main>
                <Footer />
            </div>
        </Providers>
    )
}
