import  createApp  from '../index.jsx';

import { UserModel } from '../models/local-fs/user.js';

export default createApp({ userModel: UserModel });
