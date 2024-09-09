import './Header.css';
import Link from "next/link";
import { ArrowDownIcon, MenuIcon, SearchIcon, UserIcon, WriteIcon } from "../icons";

const Header = () => {
    return (
        <header className="absolute flex justify-between items-center flex-row mx-4 lg:w-3/4 lg:mx-auto bg-white/80 px-8 py-2 rounded-xl top-10 left-0 right-0 shadow-2xl z-50 backdrop-blur-md">
            <nav className="flex items-center h-full gap-x-4">
                <MenuIcon size={28} className="cursor-pointer lg:hidden"/>
                <Link href={'/'} className="navbar-logo">LOGO</Link>
                <span className="navbar-link items-center gap-x-1 hidden lg:flex">
                    Categories
                    <ArrowDownIcon size={16} />
                </span>
                <span className="navbar-link hidden lg:inline-block">Discover</span>
                <span className="navbar-link hidden lg:inline-block">Daily Ideas</span>
            </nav>
            
            <div className="flex items-center h-full gap-x-3">
                <SearchIcon size={28} />
                <UserIcon size={28} className="hidden lg:inline-block" />
                <Link href={"/write"} className="navbar-button flex items-center gap-x-2 capitalize">
                    <WriteIcon size={20} />
                    write
                </Link>
            </div>
            
        </header>
    );
}

export default Header;