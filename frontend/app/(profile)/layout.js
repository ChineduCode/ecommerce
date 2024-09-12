import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProfileSideBar from "@/components/ProfileSideBar"
import Providers from "@/components/Provider"
import { WishlistProvider } from '@/utils/wishlistContext'

export default function ProfileLayout({ children }){
    return(
        <Providers>
            <div className='wrapper'>
                <Header />
                <main className='profile-page-layout'>
                    <h1>My Profile</h1>
                    <div className='profile-container'>
                        <ProfileSideBar />
                        <WishlistProvider>
                            { children }
                        </WishlistProvider>
                    </div>
                </main>
                <Footer />
            </div>
        </Providers>
    )
}
