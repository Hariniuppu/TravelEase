import React, { useEffect, useState } from "react";
import axios from "axios";

function Packages() {
    const [packages, setPackages] = useState([]);
    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [editId, setEditId] = useState(null);

    // Check logged-in user role
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const isAdmin = user?.role === "admin";

    const emptyForm = {
        packageId: "",
        packageName: "",
        destination: "",
        duration: "",
        numberOfPersons: "",
        price: "",
        hotelName: "",
        travelMode: "",
        status: "Available"
    };

    const [form, setForm] = useState(emptyForm);

    // Fetch packages
    const fetchPackages = () => {
        axios.get("http://localhost:5000/api/packages")
            .then((response) => setPackages(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Add or Update package (Admin only)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            alert("Only Admin can manage packages!");
            return;
        }

        const data = {
            ...form,
            numberOfPersons: Number(form.numberOfPersons),
            price: Number(form.price)
        };

        try {
            if (editId) {
                await axios.put(
                    `http://localhost:5000/api/packages/${editId}`,
                    data
                );

                alert("Package updated successfully!");
                setEditId(null);

            } else {
                await axios.post(
                    "http://localhost:5000/api/packages",
                    data
                );

                alert("Package added successfully!");
            }

            setForm(emptyForm);
            fetchPackages();

        } catch (error) {
            alert("Operation failed!");
            console.log(error);
        }
    };

    // Edit package (Admin only)
    const editPackage = (item) => {
        if (!isAdmin) return;

        setForm({
            packageId: item.packageId || "",
            packageName: item.packageName || "",
            destination: item.destination || "",
            duration: item.duration || "",
            numberOfPersons: item.numberOfPersons || "",
            price: item.price || "",
            hotelName: item.hotelName || "",
            travelMode: item.travelMode || "",
            status: item.status || "Available"
        });

        setEditId(item._id);
    };

    // Delete package (Admin only)
    const deletePackage = async (id) => {
        if (!isAdmin) return;

        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await axios.delete(
                    `http://localhost:5000/api/packages/${id}`
                );

                alert("Package deleted successfully!");
                fetchPackages();

            } catch (error) {
                alert("Error deleting package");
                console.log(error);
            }
        }
    };

    // Search and price filter
    const filteredPackages = packages.filter((item) => {
        const matchesDestination = item.destination
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesPrice =
            maxPrice === "" ||
            Number(item.price) <= Number(maxPrice);

        return matchesDestination && matchesPrice;
    });

    return (
        <div style={{ padding: "30px" }}>

            <h1 style={{
                textAlign: "center",
                color: "#123c69"
            }}>
                Travel Packages
            </h1>

            {/* Admin Only: Add / Update Form */}
            {isAdmin && (
                <form onSubmit={handleSubmit} style={{
                    maxWidth: "500px",
                    margin: "25px auto",
                    padding: "20px",
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 3px 10px #ccc"
                }}>

                    <h2>
                        {editId ? "Update Package" : "Add New Package"}
                    </h2>

                    {Object.keys(form).map((field) => (
                        <input
                            key={field}
                            name={field}
                            placeholder={field}
                            value={form[field]}
                            onChange={handleChange}
                            type={
                                field === "price" ||
                                field === "numberOfPersons"
                                    ? "number"
                                    : "text"
                            }
                            required
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "10px",
                                margin: "12px 0",
                                boxSizing: "border-box"
                            }}
                        />
                    ))}

                    <button type="submit">
                        {editId ? "Update Package" : "Add Package"}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditId(null);
                                setForm(emptyForm);
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            )}

            <h2 style={{ textAlign: "center" }}>
                Available Packages
            </h2>

            {/* Search and Filter: Both Admin and User */}
            <div style={{
                textAlign: "center",
                margin: "20px"
            }}>

                <input
                    placeholder="Search destination"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Maximum Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            {/* Package Cards */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px"
            }}>

                {filteredPackages.map((item) => (
                    <div key={item._id} style={{
                        width: "280px",
                        padding: "20px",
                        background: "white",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px #ccc"
                    }}>

                        <h2>{item.packageName}</h2>

                        <p>Destination: {item.destination}</p>
                        <p>Duration: {item.duration}</p>
                        <p>Persons: {item.numberOfPersons}</p>
                        <p>Hotel: {item.hotelName}</p>
                        <p>Travel Mode: {item.travelMode}</p>

                        <h3>Price: ₹{item.price}</h3>

                        <p>Status: {item.status}</p>

                        {/* Admin Only: Edit and Delete */}
                        {isAdmin && (
                            <>
                                <button
                                    onClick={() => editPackage(item)}
                                    style={{
                                        marginRight: "15px",
                                        padding: "8px 18px"
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deletePackage(item._id)}
                                    style={{
                                        marginLeft: "5px",
                                        padding: "8px 18px"
                                    }}
                                >
                                    Delete
                                </button>
                            </>
                        )}

                    </div>
                ))}

            </div>

            {filteredPackages.length === 0 && (
                <p style={{ textAlign: "center" }}>
                    No packages found.
                </p>
            )}

        </div>
    );
}

export default Packages;