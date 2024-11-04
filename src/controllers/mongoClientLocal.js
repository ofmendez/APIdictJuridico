import { MongoClient } from 'mongodb';
const uri = 'mongodb://localhost:27017';

const clients = {
	terms: null,
	users: null
};

let connecting = false;

async function getClient (collectionName) {
	try {
		if (!clients[collectionName] || (clients[collectionName] && clients[collectionName]?.topology?.s?.state !== 'connecting')) {
			clients[collectionName] = new MongoClient(uri);
			clients[collectionName].on('error', console.error.bind(console, 'MongoDB connection error:'));
			await clients[collectionName].connect();
		}
		return await clients[collectionName];
	} catch (error) {
		console.error(`Failed to connect to the MongoDB server. Error: ${error}`);
	}
}

async function connect (collectionName) {
	let c = await getClient(collectionName);
	while (!c?.topology?.isConnected()) {
		connecting = true;
		await new Promise(resolve => setTimeout(resolve, 500));
		c = await getClient();
	}
	connecting = false;
	return await c.db('dictionary2').collection(collectionName);
}

async function closeClient (collectionName) {
	if (clients[collectionName] && !connecting) {
		await clients[collectionName].close();
		clients[collectionName] = null;
	}
}

export { connect, closeClient };
