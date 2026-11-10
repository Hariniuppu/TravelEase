import React, { useEffect, useState } from "react";
import axios from "axios";

function Destinations() {
    const [destinations, setDestinations] = useState([]);
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    // Check logged-in user role
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const isAdmin = user?.role === "admin";

    // Fetch destinations
    const fetchDestinations = () => {
        axios.get("http://localhost:5000/api/destinations")
            .then((response) => {
                setDestinations(
                    response.data.filter((item) => item.name)
                );
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    // Add destination (Admin only)
    const addDestination = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            alert("Only Admin can add destinations!");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/destinations",
                {
                    name,
                    country,
                    description,
                    image
                }
            );

            alert("Destination added successfully!");

            setName("");
            setCountry("");
            setDescription("");
            setImage("");

            fetchDestinations();

        } catch (error) {
            alert("Error adding destination");
            console.log(error);
        }
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1 style={{
                textAlign: "center",
                color: "#123c69"
            }}>
                Popular Destinations
            </h1>

            {/* Admin Only: Add Destination Form */}
            {isAdmin && (
                <form
                    onSubmit={addDestination}
                    style={{
                        maxWidth: "500px",
                        margin: "25px auto",
                        padding: "20px",
                        background: "white",
                        borderRadius: "10px",
                        boxShadow: "0 3px 10px #ccc"
                    }}
                >

                    <h2>Add New Destination</h2>

                    <input
                        placeholder="Destination Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            margin: "12px 0",
                            boxSizing: "border-box"
                        }}
                    />

                    <input
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            margin: "12px 0",
                            boxSizing: "border-box"
                        }}
                    />

                    <input
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            margin: "12px 0",
                            boxSizing: "border-box"
                        }}
                    />

                    <input
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            margin: "12px 0",
                            boxSizing: "border-box"
                        }}
                    />

                    <button type="submit">
                        Add Destination
                    </button>

                </form>
            )}

            {/* Destinations visible to both Admin and User */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "25px"
            }}>

                {destinations.map((destination) => (
                    <div
                        key={destination._id}
                        style={{
                            width: "300px",
                            background: "white",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px #ccc"
                        }}
                    >

                        <img
                            src={destination.image}
                            alt={destination.name}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover"
                            }}
                        />

                        <div style={{ padding: "15px" }}>

                            <h2>{destination.name}</h2>

                            <h4>
                                Country: {destination.country}
                            </h4>

                            <p>{destination.description}</p>

                        </div>
                    </div>
                ))}

            </div>

            {destinations.length === 0 && (
                <p style={{ textAlign: "center" }}>
                    No destinations available.
                </p>
            )}

        </div>
    );
}

export default Destinations;