import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between">
        <div>Bike Rental</div>
        <button
          onClick={handleLogout}
          className="bg-red-600 p-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
