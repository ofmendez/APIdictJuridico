import { createApp } from '../index.js'

import { UserModel } from '../models/mongo-prod/user.js'

createApp({ userModel: UserModel });