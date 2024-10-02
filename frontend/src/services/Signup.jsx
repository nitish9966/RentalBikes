import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Default to "user"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Frontend form validation
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          type: userType, // Correct field name to match the backend schema
        }),
      });

      const data = await response.json();
      console.log("Response data:", data); // Log response for debugging

      if (data.success) {
        navigate("/login"); // Redirect to login after successful signup
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during signup");
      console.error("Error occurred during signup:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full p-2 border"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full p-2 border"
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="mb-4 w-full p-2 border"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-green-600 text-white p-2 w-full">
          Signup
        </button>
        <div className="mt-4">
          Already registered?&nbsp;
          <b>
            <Link to="/login">Login</Link>
          </b>
        </div>
      </form>
    </div>
  );
}

export default Signup;
