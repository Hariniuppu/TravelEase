import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Packages from "./pages/packages";
import Customers from "./pages/customers";
import Bookings from "./pages/Booking";
import Destinations from "./pages/Destinations";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

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

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/user-dashboard" element={<UserDashboard />} />
</Routes>
</BrowserRouter>
);
}

export default App;