import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import './Header.css';
import Link from "next/link";

const Header = () => {
    return (
        <header className="absolute flex justify-between items-center flex-row w-3/4 mx-auto bg-white/80 px-8 py-2 rounded-xl top-10 left-0 right-0 shadow-2xl z-50 backdrop-blur-md">
            <nav className="flex items-center h-full gap-x-2">
                <Link href={'/'} className="navbar-logo">LOGO</Link>
                <span className="navbar-link flex items-center gap-1">
                    Categories
                    <IoIosArrowDown size={16} />
                </span>
                <span className="navbar-link">Tips & Advices</span>
                <span className="navbar-link">Daily Ideas</span>
            </nav>
            
            <div className="flex items-center h-full gap-x-3">
                <IoIosSearch size={28}/>
                <button className="navbar-button">My Profile</button>
            </div>
            
        </header>
    );
}

export default Header;