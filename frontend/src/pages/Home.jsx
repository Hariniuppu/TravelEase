
import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <div style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "450px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
                padding: "20px"
            }}>
                <h1 style={{ fontSize: "45px" }}>
                    Welcome to TravelEase
                </h1>

                <p style={{ fontSize: "20px", margin: "20px" }}>
                    Explore the World, Create Beautiful Memories!
                </p>

                <Link to="/packages" style={{
                    backgroundColor: "#ff9800",
                    color: "white",
                    padding: "14px 28px",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontWeight: "bold"
                }}>
                    Explore Packages
                </Link>
            </div>

            {/* About Section */}
            <div style={{
                textAlign: "center",
                padding: "40px 20px"
            }}>
                <h2 style={{ color: "#123c69" }}>
                    Discover Your Next Adventure
                </h2>

                <p style={{ marginTop: "15px", fontSize: "17px" }}>
                    TravelEase helps you explore destinations, find
                    affordable travel packages and book your dream trip.
                </p>
            </div>

            {/* Features Section */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "25px",
                padding: "20px"
            }}>
                <div style={cardStyle}>
                    <h2>🌍 Destinations</h2>
                    <p>Explore beautiful places around the world.</p>
                    <Link to="/destinations">Explore Destinations</Link>
                </div>

                <div style={cardStyle}>
                    <h2>✈️ Travel Packages</h2>
                    <p>Find packages that match your budget.</p>
                    <Link to="/packages">View Packages</Link>
                </div>

                <div style={cardStyle}>
                    <h2>🎫 Easy Booking</h2>
                    <p>Book your favourite travel package easily.</p>
                    <Link to="/bookings">Book Now</Link>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                backgroundColor: "#123c69",
                color: "white",
                textAlign: "center",
                padding: "20px",
                marginTop: "30px"
            }}>
                <p>© 2026 TravelEase. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

const cardStyle = {
    width: "280px",
    padding: "25px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    textAlign: "center"
};

export default Home;
