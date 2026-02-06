import React from "react";
import { MainLayout } from "./fragments";
import { getFirebaseConfig } from "./helpers";
import type { DatabaseTarget } from "./types";
import { initializeApp } from "firebase/app";
import { useAtom, useSetAtom } from "jotai";
import { fbAppAtom, fbDatabaseTargetAtom } from "./state";

import "./App.css";

function App() {
	const [fbApp, setFbApp] = useAtom(fbAppAtom);
	const setDbTarget = useSetAtom(fbDatabaseTargetAtom);
	React.useEffect(() => {
		const fbConfig = getFirebaseConfig();

		if (!fbApp) {
			const dbTarget = import.meta.env.VITE_TARGET_ENV as DatabaseTarget;
			const newApp = initializeApp(fbConfig);

			console.log("Initialized Firebase App:", {
				newApp,
				dbTarget,
			});

			setFbApp(newApp);
			setDbTarget(dbTarget);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fbApp]);

	/**
	 * Doing like this so we can reutilize MainLayout if wanted
	 * Also keeps App clean and focused
	 *
	 * Additionally, if wanted, it would be possible to group modals and other "detached" components here
	 */
	return <MainLayout />;
}

export default App;
