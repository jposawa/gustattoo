import { DATABASE_CONTEXT } from "@/constants";
import type { DatabaseTarget, FirebaseConfig } from "../types";

export const getFirebaseConfig = () => {
	try {
		const config: FirebaseConfig = {
			apiKey: "",
			authDomain: "",
			databaseURL: "",
			projectId: "",
			storageBucket: "",
			messagingSenderId: "",
			appId: "",
			measurementId: "",
		};

		Object.keys(config).forEach((key) => {
			const value = import.meta.env[`VITE_FB_${key}`];

			config[key as keyof FirebaseConfig] = value;
		});

		if (Object.values(config).some((value) => !value)) {
			throw new Error("Missing Firebase configuration values");
		}

		return config;
	} catch (error) {
		console.error("Error loading Firebase configuration:", error);
		throw error;
	}
};

export const getFullPath = (
  nodePath: string,
  dbTarget = import.meta.env.VITE_TARGET_ENV as DatabaseTarget
) => {
  const basePrefix = `${DATABASE_CONTEXT}/${dbTarget}`;

  const fullPath = `${basePrefix}/${nodePath}`;

  return fullPath;
};