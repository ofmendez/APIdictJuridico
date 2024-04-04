import { MongoClient } from 'mongodb';
const uri = `mongodb+srv://ofmendez:${process.env.ATLAS_PASS}@cluster0.bss36fz.mongodb.net/?retryWrites=true&w=majority`;

let client = null;
let connecting = false;

async function getClient () {
	try {
		if (!client || (client && client?.topology?.s?.state !== 'connecting')) {
			client = new MongoClient(uri);
			client.on('error', console.error.bind(console, 'MongoDB connection error:'));
			await client.connect();
		}
		return client;
	} catch (error) {
		console.error(`Failed to connect to the MongoDB server. Error: ${error}`);
	}
}

async function connect (collectionName) {
	let c = await getClient();
	while (!c?.topology?.isConnected()) {
		connecting = true;
		await new Promise(resolve => setTimeout(resolve, 500));
		c = await getClient();
	}
	connecting = false;
	return c.db('dictionary').collection(collectionName);
}

async function closeClient () {
	if (client && !connecting) {
		await client.close();
		client = null;
	}
}

export { connect, closeClient };
