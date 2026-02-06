export const isCurrentPage = (
	path: string | string[],
	location: object & { pathname: string } = window.location,
	/** Not the ideal way to define location type, but for now it will be this way
	 *
	 * TODO: Improve this
	 */
) => {
	const currentPath = location.pathname;

	const testedPaths = Array.isArray(path) ? path : [path];

	const isCurrent = testedPaths.some(
		(testedPath) => currentPath === testedPath,
	);

	return isCurrent;
};
