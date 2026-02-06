import React from "react";
import { useAtomValue } from "jotai";
import { fbAppAtom, fbDatabaseTargetAtom } from "@/state";
import { getDatabase } from "firebase/database";
import { fetchData, subscribeData, writeData } from "@/services";
import type { VoidFunc } from "@/types";

export const useFbDatabase = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const dbTarget = useAtomValue(fbDatabaseTargetAtom);
	const fbApp = useAtomValue(fbAppAtom);
	const [unsubscribeList, setUnsubscribeList] = React.useState<VoidFunc[]>([]);

	const { fbDb } = React.useMemo(() => {
		if (!fbApp?.name) {
			console.warn("Loading FB App...");

			return {};
		}

		const fbDb = getDatabase(fbApp);

		return { fbDb };
	}, [fbApp]);

	const saveData = React.useCallback(
		(path: string, data: object) => {
			if (!isLoading && fbDb) {
				setIsLoading(true);

				const hookResult = writeData(fbDb, path, data, {
					dbTarget,
				})
					.then((response) => response)
					.catch((error) => {
						throw error;
					})
					.finally(() => {
						setIsLoading(false);
					});

				return hookResult;
			}
		},
		[dbTarget, fbDb, isLoading],
	);

	const getData = React.useCallback(
		(path: string) => {
			if (!isLoading && fbDb) {
				setIsLoading(true);

				const hookResult = fetchData(fbDb, path, { dbTarget }).finally(() => {
					setIsLoading(false);
				});

				return hookResult;
			}
		},
		[dbTarget, fbDb, isLoading],
	);

	const listenData = React.useCallback(
		<T,>(path: string, callback: (data: T | null) => void) => {
			if (!isLoading && fbDb) {
				setIsLoading(true);
				const listenerEnder = subscribeData(fbDb, path, callback, { dbTarget });

				setUnsubscribeList([...unsubscribeList, listenerEnder]);
				setIsLoading(false);
			}
		},
		[dbTarget, fbDb, isLoading, unsubscribeList],
	);

	React.useEffect(() => {
		return () => {
			unsubscribeList?.forEach((unsubFunc) => {
				unsubFunc();
			});
		};
	}, [unsubscribeList]);

	return { isLoading, saveData, getData, listenData };
};
