
import React, { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
    const [packages, setPackages] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [form, setForm] = useState({
        customerName: "",
        email: "",
        packageId: "",
        packageName: "",
        numberOfPersons: 1,
        totalPrice: 0,
        status: "Booked"
    });

    useEffect(() => {
        axios.get("http://localhost:5000/api/packages")
            .then((response) => setPackages(response.data))
            .catch((error) => console.log(error));

        fetchBookings();
    }, []);

    const fetchBookings = () => {
        axios.get("http://localhost:5000/api/bookings")
            .then((response) => setBookings(response.data))
            .catch((error) => console.log(error));
    };

    const handlePackageChange = (e) => {
        const selectedPackage = packages.find(
            (item) => item._id === e.target.value
        );

        if (selectedPackage) {
            setForm({
                ...form,
                packageId: selectedPackage.packageId,
                packageName: selectedPackage.packageName,
                totalPrice:
                    selectedPackage.price * Number(form.numberOfPersons)
            });
        }
    };

    const handlePersonsChange = (e) => {
        const persons = Number(e.target.value);
        const selectedPackage = packages.find(
            (item) => item.packageId === form.packageId
        );

        setForm({
            ...form,
            numberOfPersons: persons,
            totalPrice: selectedPackage
                ? selectedPackage.price * persons
                : 0
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/bookings",
                form
            );

            alert("Booking successful!");

            setForm({
                customerName: "",
                email: "",
                packageId: "",
                packageName: "",
                numberOfPersons: 1,
                totalPrice: 0,
                status: "Booked"
            });

            fetchBookings();

        } catch (error) {
            alert("Booking failed!");
            console.log(error);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1 style={{ textAlign: "center", color: "#123c69" }}>
                Book Your Travel Package
            </h1>

            <form onSubmit={handleSubmit} style={{
                maxWidth: "500px",
                margin: "25px auto",
                padding: "25px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 3px 10px #ccc"
            }}>
                <input
                    placeholder="Customer Name"
                    value={form.customerName}
                    onChange={(e) => setForm({
                        ...form,
                        customerName: e.target.value
                    })}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({
                        ...form,
                        email: e.target.value
                    })}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />

                <select
                    value={packages.find(
                        (item) => item.packageId === form.packageId
                    )?._id || ""}
                    onChange={handlePackageChange}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                >
                    <option value="">Select Travel Package</option>

                    {packages.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.packageName} - ₹{item.price}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min="1"
                    placeholder="Number of Persons"
                    value={form.numberOfPersons}
                    onChange={handlePersonsChange}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />

                <h3 style={{ margin: "15px 0" }}>
                    Total Price: ₹{form.totalPrice}
                </h3>

                <button type="submit" style={{ padding: "10px 20px" }}>
                    Confirm Booking
                </button>
            </form>

            <h2 style={{ textAlign: "center" }}>Booking Details</h2>

            {bookings.map((booking) => (
                <div key={booking._id} style={{
                    maxWidth: "500px",
                    margin: "15px auto",
                    padding: "18px",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px #ccc"
                }}>
                    <h3>{booking.packageName}</h3>
                    <p>Customer: {booking.customerName}</p>
                    <p>Email: {booking.email}</p>
                    <p>Persons: {booking.numberOfPersons}</p>
                    <p>Total Price: ₹{booking.totalPrice}</p>
                    <p>Status: {booking.status}</p>
                </div>
            ))}
        </div>
    );
}

export default Bookings;
