import { FaBars } from 'react-icons/fa6'

export default function Header(){
    return(
        <header>
            <div className="hamburger-logo-nav">
                <div className="hamburger-logo">
                    <FaBars />
                    <div className="logo"> <img src="/logo.svg" alt="logo" /> </div>
                </div>
            </div>
        </header>
    )
}