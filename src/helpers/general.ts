export const isEmptyObj = (object: object | null) => {
	if (!object || typeof object !== "object") {
		return true;
	}

	const keys = Object.keys(object);

	return keys.length === 0;
};
