import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredUserType }) {
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (user.type !== requiredUserType) {
    // If user type doesn't match, redirect to their dashboard
    return user.type === "admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/user" />
    );
  }

  // If everything is fine, render the child component
  return children;
}

export default ProtectedRoute;
