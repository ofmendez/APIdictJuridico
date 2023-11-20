import { scryptSync } from 'node:crypto';

const checkAuth = async (_email, _password, userController) => {
	const users = await userController.getAllRaw();
	const user = users.find(user => user.email === _email);
	console.log('#> user: ', user);
	if (!user)
		return { exist: false };

	const hash = scryptSync(_password + process.env.OFPEPE, user.salt, 64).toString('hex');
	console.log('#> hash 1: ', hash);
	console.log('#> hash 2: ', user.password);
	if (hash !== user.password)
		return { exist: false };
	console.log('#> EXIST! ');

	return { exist: true, user: { _id: user._id, email: user.email, role: user.role, name: user.name } };
};

const handleLogin = async ({ c, userController }) => {
	const { email, password } = c.req.query();
	if (!email || !password)
		return c.json({ message: 'Please provide email and password' }, 400);
	const { exist, user } = await checkAuth(email.toLowerCase(), password, userController);
	if (!exist)
		return c.json({ message: 'Invalid credentials' }, 401);
	return c.json({ message: 'You are loged', token: `${process.env.TOKEN}`, user }, 200);
};

export { handleLogin };
