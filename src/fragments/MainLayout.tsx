import React from "react";
import clsx from "clsx";
import { fbAppAtom, themeAtom } from "@/state";
import { useAtomValue } from "jotai";
import { NavMenu } from "@/components";
import { PageRouter } from "@/pages";

import styles from "./MainLayout.module.css";
import { useFbConfig } from "@/hooks";

type MainLayoutProps = {
	className?: string;
	style?: React.CSSProperties;
};

export const MainLayout: React.FC<MainLayoutProps> = ({
	className = "",
	style = {},
}) => {
	const currentTheme = useAtomValue(themeAtom);
	const { getConfig } = useFbConfig();
	const fbApp = useAtomValue(fbAppAtom);
	const [baseConfig, setBaseConfig] = React.useState<unknown>();

	React.useEffect(() => {
		if (fbApp?.name) {
			getConfig()
				.then((configData) => {
					setBaseConfig(configData);
				})
				.catch((error) => {
					console.error("Error fetching config data:", error);
				});
		}
	}, [fbApp, getConfig]);

	React.useEffect(() => {
		console.log("Base config updated:", baseConfig);
	}, [baseConfig]);

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
