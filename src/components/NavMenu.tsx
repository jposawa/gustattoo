import React from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./NavMenu.module.css";

export const NavMenu = () => {
	const location = useLocation();

	const isCurrentPage = React.useCallback(
		(path: string) => {
			const currentPath = location.pathname;
			const windowLocaltion = window.location;

			console.log("locations data", {
				location,
				windowLocaltion,
			});

			const isCurrent = currentPath === path;

			return isCurrent;
		},
		[location],
	);

	return (
		<nav className={styles.navMenu}>
			<Link to="/" className={isCurrentPage("/") ? styles.active : ""}>
				Home
			</Link>
			<Link
				to="/about"
				className={isCurrentPage("/about") ? styles.active : ""}
			>
				About
			</Link>
		</nav>
	);
};
