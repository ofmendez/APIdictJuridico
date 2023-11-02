import { createApp } from '../index.js';

import { UserModel } from '../models/local-fs/user.js';

createApp({ userModel: UserModel });