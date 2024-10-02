import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Login from "./services/Login";
import Signup from "./services/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./services/Home";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Prevent logged-in users from accessing login and signup */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={`/${user.type}`} />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to={`/${user.type}`} />}
      />

      {/* Admin Dashboard Protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredUserType="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* User Dashboard Protected */}
      <Route
        path="/user"
        element={
          <ProtectedRoute requiredUserType="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
