export const envMiddleware = (c, next, models) => {
	Object.values(models).forEach(model => {
		model.setEnv(c.env);
	});
	next();
};
