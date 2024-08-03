import { IoIosArrowDown } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="absolute flex justify-between items-center flex-row w-3/4 mx-auto bg-white/80 px-8 py-2 rounded-xl top-10 left-0 right-0 shadow-2xl z-50 backdrop-blur-md">
            <div className="flex items-center h-full gap-x-2">
                <span className="navbar-logo">LOGO</span>
                <span className="navbar-link flex items-center gap-1">
                    Categories
                    <IoIosArrowDown size={16} />
                </span>
                <span className="navbar-link">Tips & Advices</span>
                <span className="navbar-link">Daily Ideas</span>
            </div>
            
            <div className="flex items-center h-full gap-x-3">
                <IoIosSearch size={28}/>
                <button className="navbar-button">My Profile</button>
            </div>
            
        </nav>
    );
}

export default Navbar;