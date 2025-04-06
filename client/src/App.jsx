import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery/Gallery.jsx";
import Outfits from "./components/Outfits/Outfits.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Planner from "./components/Planner/Planner.jsx";
import UserAuth from "./components/Auth/UserAuth.jsx";
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
						<Route path="/" element={<UserAuth />}></Route>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path="/planner" element={<Planner />}></Route>
						<Route path="/outfits" element={<Outfits />}></Route>
						<Route path="/gallery" element={<Gallery />}></Route>
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
