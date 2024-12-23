import './Header.css';
import Link from "next/link";
import { ArrowDownIcon, MenuIcon, WriteIcon } from "../icons";
import { AccountDropdown, TopicDropdown, Search } from '..';
import { Header } from '../common';

export const DefaultHeader = () => {
    return (
        <Header>
            <nav className="flex items-center h-full gap-x-4">
                <Link href={'/'} className="navbar-logo">LOGO</Link>
                <TopicDropdown />
            </nav>
            
            <div className="flex items-center h-full gap-x-3">
                <Search />
                <AccountDropdown />
                <Link href={"/write"} className="button-primary hidden lg:flex items-center gap-x-2 capitalize">
                    <WriteIcon size={20} />
                    write
                </Link>
                <button className="lg:hidden">
                    <MenuIcon size={28} className="cursor-pointer w-full"/>
                </button>
            </div>
        </Header>
    );
};