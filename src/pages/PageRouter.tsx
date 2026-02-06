import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Home, About } from ".";

export const PageRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
		</Routes>
	);
};
