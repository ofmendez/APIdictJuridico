const getStatistics = async ({ c, models }) => {
	const tableQuery = c.req.path.split('/').pop(); // Must be subterms in the future
	const terms = await models.termModel.getAll(c);
	const count = terms.reduce((acc, term) => acc + term.meanings.length, 0);

	return c.json({ message: `son: ${count}` }, 200);
};

export { getStatistics };
