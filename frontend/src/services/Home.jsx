import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Bike Rental</h1>
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Click Me to Start
        </button>
      </div>
    </div>
  );
};

export default Home;
