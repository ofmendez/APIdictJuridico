import createApp from '../index.jsx';

import { MovieModel } from '../models/mongo/movie.js';
import { UserModel } from '../models/mongo/user.js';

const userModel = new UserModel();
const movieModel = new MovieModel();

const models = { userModel, movieModel };

export default createApp({ models });
