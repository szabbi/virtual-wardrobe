import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) return <p>Loading...</p>;

	return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
