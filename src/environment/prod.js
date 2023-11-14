import createApp from '../index.jsx';

import { MovieModel } from '../models/mongo/movie.js';
import { UserModel } from '../models/mongo/user.js';
import { TermModel } from '../models/mongo/term.js';

const userModel = new UserModel();
const movieModel = new MovieModel();
const termModel = new TermModel();

const models = { userModel, movieModel, termModel };

export default createApp({ models });
