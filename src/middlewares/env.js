function timeout (ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
export const envMiddleware = async (c, next, models) => {
	Object.values(models).forEach(model => {
		model.setEnv(c.env);
	});
	console.log(`----> [${c.req.method}] ${c.req.url}<------`);
	await timeout(1500);
	await next();
};
