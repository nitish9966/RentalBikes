import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on user type
        if (data.user.type === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        setError(data.message); // Show error if login fails
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-600">{error}</p>}
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
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">
          Login
        </button>
        <div className="mt-4">
          Please signup before login?&nbsp;
          <b>
            <Link to="/signup">Register</Link>
          </b>
        </div>
      </form>
    </div>
  );
}

export default Login;
