import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery/Gallery.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Planner from "./components/Planner/Planner.jsx";
import Login from "./components/Auth/Login.jsx";
import Registration from "./components/Auth/Registration.jsx";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/registration" element={<Registration />}></Route>
				{/* <Route path="/planner" element={<Planner />}></Route>
				<Route path="/Gallery" element={<Gallery />}></Route>
				<Route path="/about"></Route> */}
			</Routes>
		</Router>
	);
}

export default App;
