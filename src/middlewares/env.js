export const envMiddleware = async (c, next, models) => {
	Object.values(models).forEach(model => {
		model.setEnv(c.env);
	});
	console.log(`----> [${c.req.method}] ${c.req.url}<------`);
	await next();
};
