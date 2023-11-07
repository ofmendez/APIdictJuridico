import createApp from '../index.jsx';

import { MovieModel } from '../models/mongo/movie.js';
import { UserModel } from '../models/mongo/user.js';

export default createApp({ userModel: UserModel, movieModel: MovieModel });
