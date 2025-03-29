import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery/Gallery.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Planner from "./components/Planner/Planner.jsx";
import Login from "./components/Auth/Login.jsx";
import Registration from "./components/Auth/Registration.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route element={<PublicRoute />}>
						<Route path="/" element={<Login />}></Route>
						<Route
							path="/registration"
							element={<Registration />}
						></Route>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path="/planner" element={<Planner />}></Route>
						<Route path="/gallery" element={<Gallery />}></Route>
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
