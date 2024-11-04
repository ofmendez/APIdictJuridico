import createApp from '../index.jsx';
import { connect, closeClient } from '../controllers/mongoClient.js';

import { UserModel } from '../models/mongo/user.js';
import { TermModel } from '../models/mongo/term.js';

const userModel = new UserModel();
const termModel = new TermModel();

const models = { userModel, termModel };
Object.values(models).forEach((model) => model.setEnv(connect, closeClient));

export default createApp({ models });
