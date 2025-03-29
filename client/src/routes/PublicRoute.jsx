import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) return <p>Loading...</p>;

	return isAuthenticated ? <Navigate to="/gallery" replace /> : <Outlet />;
};

export default PublicRoute;
