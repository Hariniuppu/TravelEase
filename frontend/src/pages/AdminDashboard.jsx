
import React from "react";

function AdminDashboard() {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || user.role !== "admin") {
        return <h2>Access Denied</h2>;
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>Admin Dashboard</h1>
            <h3>Welcome, {user.name}</h3>

            <div>
                <h2>Manage TravelEase</h2>
                <p>Manage packages, destinations, customers and bookings.</p>
            </div>

            <button onClick={() => window.location.href = "/packages"}>
                Manage Packages
            </button>

            <button onClick={() => window.location.href = "/destinations"}>
                Manage Destinations
            </button>

            <button onClick={() => window.location.href = "/customers"}>
                View Customers
            </button>

            <button onClick={() => window.location.href = "/bookings"}>
                View Bookings
            </button>

            <button onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
            }}>
                Logout
            </button>
        </div>
    );
}

export default AdminDashboard;
