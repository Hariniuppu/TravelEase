import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>TravelEase</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/destinations">Destinations</Link>
                <Link to="/packages">Packages</Link>
                <Link to="/customers">Customers</Link>
                <Link to="/bookings">Bookings</Link>
            </div>
        </nav>
    );
}

export default Navbar;