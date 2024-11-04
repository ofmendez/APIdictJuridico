import { scryptSync } from 'node:crypto';

const checkAuth = async (_email, _password, userController) => {
	const users = await userController.getAllRaw();
	const user = users.find(user => user.email === _email);
	console.log('#> user: ', user);
	if (!user)
		return { exist: false };

	const hash = scryptSync(_password + process.env.OFPEPE, user.salt, 64).toString('hex');
	// incorrect password
	if (hash !== user.password)
		return { exist: false };
	// inactive user
	if (user.suscription && user.suscription === 'Inactivo')
		return { exist: false, error: { message: 'Your suscription is inactive', code: 410 } };
	// expired suscription
	if (user.initSuscription && parseInt(user.timeToExpire) > 0) {
		const initSuscription = new Date(user.initSuscription);
		const endSuscription = new Date(initSuscription);
		endSuscription.setDate(endSuscription.getDate() + parseInt(user.timeToExpire));
		if (endSuscription < new Date())
			return { exist: false, error: { message: 'Your suscription has expired', code: 410 } };
	}

	console.log('#> EXIST! ');
	userController.updateOne({ _id: user._id, lastLogin: new Date() });
	return { exist: true, user: { _id: user._id, email: user.email, role: user.role, name: user.name, modules: user.modules } };
};

const handleLogin = async ({ c, userController }) => {
	const { email, password } = c.req.query();
	if (!email || !password)
		return c.json({ message: 'Please provide email and password' }, 400);
	const { exist, user, error } = await checkAuth(email.toLowerCase(), password, userController);
	if (!exist)
		return c.json({ message: error.message }, error.code);
	return c.json({ message: 'You are loged', token: `${process.env.TOKEN}`, user }, 200);
};

export { handleLogin };
