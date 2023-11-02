import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (c) => {
    const { genre } = c.req.query();
    const movies = await this.userModel.getAll({ genre });
    return c.json(movies);
  };

  getById = async (c) => {
    const { id } = c.req.param();
    const movie = await this.userModel.getById({ id });
    if (movie) return c.json(movie);
    return c.json({ message: 'Movie not found' }, 404);
  };

  create = async (c) => {
    const body = await  c.req.json();
    const result = validateMovie(body);

    if (!result.success) {
    // 422 Unprocessable Entity
      return c.json({ error: "unprocessable" },400);
    }
    const newMovie = await this.userModel.create({ input: result.data });

    return c.json(newMovie,201);
  };

  delete = async (c) => {
    const { id } =  c.req.param();
    const result = await this.userModel.delete({ id });

    if (result === false) {
      return c.json({ message: 'Movie not found' },404);
    }

    return c.json({ message: 'Movie deleted' });
  };

  update = async (c) => {
    const body = await c.req.json();
    const result = validatePartialMovie(body);

    if (!result.success) {
      return c.json({ error: JSON.parse(result.error.message) },400);
    }

    const { id } = c.req.param();

    const updatedMovie = await this.userModel.update({ id, input: result.data });

    return c.json(updatedMovie);
  };
}
