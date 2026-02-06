import {
	Database,
	DataSnapshot,
	get,
	off,
	onValue,
	ref,
	remove,
	update,
} from "firebase/database";
import { DatabaseTarget } from "../types";
import { getFullPath, isEmptyObj } from "@/helpers";

/**
 * Busca dados de forma estática a cada chamada
 */
export const fetchData = async <T>(
	fbDb: Database,
	path: string,
	options: {
		dbTarget?: DatabaseTarget;
	} = {},
) => {
	const { dbTarget } = options;
	const fullPath = getFullPath(path, dbTarget);
	const dataRef = ref(fbDb, fullPath);

	return get(dataRef)
		.then((response) => {
			console.log("[FB] Fetch data", {
				dataRef,
				fullPath,
				response,
			});
			if (response.exists()) {
				return response.val() as T;
			}
		})
		.catch((error) => {
      console.error(`[FB] Error fetching data at ${path}`, error);
			throw error;
		});
};

/**
 * Busca dados e a cada atualização no BD é feita chamada para callback
 * Retorna função de unsubscribe
 */
export const subscribeData = <T>(
	fbDb: Database,
	path: string,
	callback: (data: T | null) => void,
	options: {
		dbTarget?: DatabaseTarget;
	} = {},
) => {
	const { dbTarget } = options;
	const fullPath = getFullPath(path, dbTarget);
	const dataRef = ref(fbDb, fullPath);

	const listener = onValue(
		dataRef,
		(snapshot: DataSnapshot) => {
			callback(snapshot.exists() ? (snapshot.val() as T) : null);
		},
		(error) => {
			console.error(`[FB_RT] Error subscribing at ${path}`, error);
			throw error;
		},
	);

	const unsubscribe = () => {
		off(dataRef, "value", listener);
	};

	return unsubscribe;
};

export const writeData = async (
	fbDb: Database,
	path: string,
	data: object | null,
	options: {
		dbTarget?: DatabaseTarget;
	} = {},
) => {
	const { dbTarget } = options;
	const fullPath = getFullPath(path, dbTarget);
	const dataRef = ref(fbDb, fullPath);

	if (isEmptyObj(data) || !data) {
		await remove(dataRef);
	} else {
		return update(dataRef, data)
			.then((response) => response)
			.catch((error) => {
				throw error;
			});
	}
};
