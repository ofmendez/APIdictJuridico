import createApp from '../index.jsx';

import { MovieModel } from '../models/local-mongo/movie.js';
import { UserModel } from '../models/local-mongo/user.js';
import { TermModel } from '../models/local-mongo/term.js';

const userModel = new UserModel();
const movieModel = new MovieModel();
const termModel = new TermModel();

const models = { userModel, movieModel, termModel };

export default createApp({ models });
