import { useState, useEffect } from "react";

function EditBikeForm({ bike, fetchBikes, onClose }) {
  const [model, setModel] = useState(bike.model);
  const [price, setPrice] = useState(bike.price);
  const [imageUrl, setImageUrl] = useState(bike.imageUrl);
  const [isAvailable, setIsAvailable] = useState(bike.isAvailable);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBike = {
      model,
      price,
      imageUrl,
      isAvailable,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/bikes/${bike._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBike),
        }
      );

      if (response.ok) {
        fetchBikes(); // Refresh bikes list
        onClose(); // Close the edit form
      } else {
        console.error("Error updating bike");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4">Edit Bike</h3>
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
        <select
          value={isAvailable}
          onChange={(e) => setIsAvailable(e.target.value === "true")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Update Bike
      </button>
      <button
        type="button"
        onClick={onClose}
        className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 mt-2"
      >
        Cancel
      </button>
    </form>
  );
}

export default EditBikeForm;
