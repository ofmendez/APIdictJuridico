function timeout (ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
export const logMiddleware = async (c, next) => {
	console.log(`[${c.req.method}] ${c.req.url} <------`);
	await timeout(1);
	await next();
};
