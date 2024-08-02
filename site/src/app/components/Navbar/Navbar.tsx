import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center flex-row w-3/4 mx-auto bg-white px-8 py-2 rounded-xl mt-10 shadow-lg">
            <div className="flex items-center h-full gap-x-2">
                <span className="navbar-logo">LOGO</span>
                <span className="navbar-link">Categories</span>
                <span className="navbar-link">Tips & Advices</span>
                <span className="navbar-link">Daily Ideas</span>
            </div>
            
            <button className="navbar-button">My Profile</button>
        </nav>
    );
}

export default Navbar;