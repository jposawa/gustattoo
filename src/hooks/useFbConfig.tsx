import React from "react";
import { useFbDatabase } from ".";

export const useFbConfig = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const { isLoading: isDbLoading, getData } = useFbDatabase();

	const isConfigLoading = isLoading || isDbLoading;

	const getConfig = React.useCallback(async () => {
		if (!isConfigLoading) {
			setIsLoading(true);

			const configData = await getData("config");

			console.log("Config data:", { configData });

			return configData;
		}
	}, [isConfigLoading, getData]);

	return {
		getConfig,
		isLoading: isConfigLoading,
	};
};
