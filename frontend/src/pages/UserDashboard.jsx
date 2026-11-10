import React from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <h1>Welcome to TravelEase!</h1>
            <p>Explore destinations and book your favourite travel packages.</p>

            <div className="dashboard-buttons">
                <button onClick={() => navigate("/destinations")}>
                    Explore Destinations
                </button>

                <button onClick={() => navigate("/packages")}>
                    View Packages
                </button>

                <button onClick={() => navigate("/bookings")}>
                    My Bookings
                </button>
            </div>

            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default UserDashboard;