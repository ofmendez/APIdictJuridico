import createApp from '../index.jsx';

import { MovieModel } from '../models/local-fs/movie.js';
import { UserModel } from '../models/local-fs/user.js';

const userModel = new UserModel();
const movieModel = new MovieModel();
const models = { userModel, movieModel };

export default createApp({ models });
