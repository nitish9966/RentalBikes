import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BikeCard from "../components/BikeCard";

function UserDashboard() {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bikes");
        const data = await response.json();
        setBikes(data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes(); // Call fetchBikes directly inside useEffect
  }, []); // Ensure empty dependency array to avoid infinite loop

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Bikes</h2>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 mb-4"
      >
        Logout
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bikes.map((bike) => (
          <BikeCard key={bike._id} bike={bike} />
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
