const checkAuth = async (_email, _password) => {
	let result = { exist: false, user: { id: -1 } };
	if (_email.toLowerCase() === 'margarita.ricaurte@ricaurteruedaabogados.com' && _password === `${process.env.ADMIN_PASS}`)
		result = { exist: true, user: { id: 1 } };
	return result;
};

const handleLogin = async (c) => {
	const { email, password } = c.req.query();
	if (!email || !password)
		return c.json({ message: 'Please provide email and password' }, 400);
	const { exist, user } = 	await checkAuth(email, password);
	// const token = await c.jwt.sign({ id: user.id }, process.env.TOKEN);
	// c.res.cookie('token', token, { httpOnly: true });
	const token = exist ? `${process.env.TOKEN}` : '';
	const	id = exist ? user.id : '';
	const msj = exist ? 'You are loged' : 'Try again';
	const status = exist ? 200 : 401;
	return c.json({ response: msj, token, id }, status);
};

export { handleLogin };
