import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function PublicLayout({ children }){
    return(
        <div className='wrapper'>
            <Header />
            { children }
            <Footer />
        </div>
    )
}
