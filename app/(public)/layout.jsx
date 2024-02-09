import Header from "@/components/Header"
import Footer from "@/components/Footer"
import '@/css/public/main.css'

export default function PublicLayout({children}){
    return(
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}