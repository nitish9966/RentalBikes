import { useState } from "react";

function AdminBikeForm({ fetchBikes }) {
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [error, setError] = useState(""); // To store error messages
  const [success, setSuccess] = useState(""); // To store success messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBike = {
      model,
      price: Number(price), // Convert price to a number
      imageUrl,
      isAvailable,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBike),
      });

      if (response.ok) {
        fetchBikes(); // Refresh bikes list
        setModel("");
        setPrice("");
        setImageUrl("");
        setIsAvailable(true); // Reset availability
        setSuccess("Bike added successfully!"); // Set success message
        setError(""); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error adding bike");
        setSuccess(""); // Clear any previous success messages
      }
    } catch (error) {
      setError("Error: " + error.message);
      setSuccess(""); // Clear any previous success messages
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4">Add a New Bike</h3>
      {error && <p className="text-red-600">{error}</p>}{" "}
      {/* Show error message */}
      {success && <p className="text-green-600">{success}</p>}{" "}
      {/* Show success message */}
      <div className="mb-4">
        <label className="block mb-2">Model</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Price (per day)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Available</label>
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
        <span className="ml-2">Yes</span>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
      >
        Add Bike
      </button>
    </form>
  );
}

export default AdminBikeForm;
