import React from "react";
import { isCurrentPage } from "@/helpers";
import { Link, useLocation } from "react-router-dom";

import styles from "./NavMenu.module.css";

export const NavMenu = () => {
	const location = useLocation();

	const checkIsCurrentPage = React.useCallback(
		(path: string | string[]) => {
			const isCurrent = isCurrentPage(path, location);

			return isCurrent;
		},
		[location],
	);

	return (
		<nav className={styles.navMenu}>
			<Link
				to="/"
				className={checkIsCurrentPage(["/", "/home"]) ? styles.active : ""}
			>
				Home
			</Link>
			<Link
				to="/about"
				className={checkIsCurrentPage("/about") ? styles.active : ""}
			>
				About
			</Link>
		</nav>
	);
};
