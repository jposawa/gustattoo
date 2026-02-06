import React from "react";
import clsx from "clsx";
import { themeAtom } from "@/state";
import { useAtomValue } from "jotai";
import { NavMenu } from "@/components";
import { PageRouter } from "@/pages";

import styles from "./MainLayout.module.css";

type MainLayoutProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const MainLayout: React.FC<MainLayoutProps> = ({
	className = "",
	style = {},
}) => {
	const currentTheme = useAtomValue(themeAtom);

	return (
		<div
			className={clsx(styles.mainLayout, styles[currentTheme], className)}
			style={style}
		>
			<NavMenu />

			<main className={styles.content}>
				<PageRouter />
			</main>
		</div>
	);
};
