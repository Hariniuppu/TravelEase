
import React, { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
    const [customers, setCustomers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const fetchCustomers = () => {
        axios.get("http://localhost:5000/api/customers")
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const registerCustomer = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/customers",
                form
            );

            alert("Customer registered successfully!");

            setForm({
                name: "",
                email: "",
                phone: ""
            });

            fetchCustomers();

        } catch (error) {
            alert("Registration failed!");
            console.log(error);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1 style={{ textAlign: "center", color: "#123c69" }}>
                Customer Registration
            </h1>

            <form onSubmit={registerCustomer} style={{
                maxWidth: "450px",
                margin: "25px auto",
                padding: "25px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 3px 10px #ccc"
            }}>
                <input
                    name="name"
                    placeholder="Customer Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />

                <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />

                <button type="submit" style={{ padding: "10px 20px" }}>
                    Register Customer
                </button>
            </form>

            <h2 style={{ textAlign: "center" }}>Registered Customers</h2>

            <div style={{ marginTop: "20px" }}>
                {customers.filter((customer) => customer.name).map((customer) => (
                    <div key={customer._id} style={{
                        maxWidth: "450px",
                        margin: "12px auto",
                        padding: "15px",
                        background: "white",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px #ccc"
                    }}>
                        <h3>{customer.name}</h3>
                        <p>Email: {customer.email}</p>
                        <p>Phone: {customer.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Customers;
