import createApp from '../index.jsx';

import { MovieModel } from '../models/local-fs/movie.js';
import { UserModel } from '../models/local-fs/user.js';

export default createApp({ userModel: UserModel, movieModel: MovieModel });
