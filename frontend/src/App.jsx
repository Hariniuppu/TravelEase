import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Packages from "./pages/packages";
import Customers from "./pages/customers";
import Bookings from "./pages/Booking";
import Destinations from "./pages/Destinations";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/destinations" element={<Destinations />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;