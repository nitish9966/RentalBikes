import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminBikeForm from "../components/AdminBikeForm";
import BikeCard from "../components/BikeCard";

function AdminDashboard() {
  const [bikes, setBikes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Fetch bikes from the backend
  const fetchBikes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bikes");
      const data = await response.json();
      setBikes(data);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  // Fetch bikes when component loads
  useEffect(() => {
    fetchBikes();
  }, []); // Ensure empty dependency array to avoid infinite loop

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <button
        onClick={toggleForm}
        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 mb-4"
      >
        {showForm ? "Close" : "Add New Bike"}
      </button>
      {showForm && <AdminBikeForm fetchBikes={fetchBikes} />}
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 mb-4"
      >
        Logout
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {bikes.map((bike) => (
          <BikeCard key={bike._id} bike={bike} />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
