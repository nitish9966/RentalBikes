import { useState } from "react";
import EditBikeForm from "./EditBikeForm";

function BikeCard({ bike, fetchBikes }) {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleClose = () => {
    setShowEditForm(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <img
        src={bike.imageUrl}
        alt={bike.model}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="text-lg font-bold">{bike.model}</h3>
      <p>Price: ${bike.price}</p>
      <p>{bike.isAvailable ? "Available" : "Not Available"}</p>
      <button
        onClick={handleEditClick}
        className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 mt-2"
      >
        Edit
      </button>
      {showEditForm && (
        <EditBikeForm
          bike={bike}
          fetchBikes={fetchBikes}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default BikeCard;
