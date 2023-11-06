import { createApp } from '../index.jsx';

import { UserModel } from '../models/mongo-prod/user.js';

createApp({ userModel: UserModel });