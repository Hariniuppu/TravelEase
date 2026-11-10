import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <h2>TravelEase</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>

                {user && user.role === "admin" && (
                    <>
                        <Link to="/packages">Manage Packages</Link>
                        <Link to="/destinations">Manage Destinations</Link>
                        <Link to="/customers">View Customers</Link>
                        <Link to="/bookings">View Bookings</Link>
                    </>
                )}

                {user && user.role === "user" && (
                    <>
                        <Link to="/destinations">Explore Destinations</Link>
                        <Link to="/packages">View Packages</Link>
                        <Link to="/bookings">My Bookings</Link>
                    </>
                )}

                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;