const express = require('express');
const movies = require('./movies.json');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { validateMovie, validatePartialMovie } = require('./schemas/movies.js');

const app = express();
const PORT = process.env.PORT ?? 1234;
app.disable('x-powered-by');
app.use(express.json());

const ACCEPTED_ORIGINS = [ // Ejemplo
  'http://127.0.0.1:5500',
  'http://localhost:8080',
  'http://localhost:1234',
  'https://david-castro.es'
];

/* Middleware para manejar el CORS usando cors
La función callback acepta dos parámetros:
Error (err): Si hay un error, pasa un objeto de error como primer argumento. Si no hay error, se pasa null.
Permitir Solicitud (allow): Un valor booleano que indica si la solicitud desde el origen debe ser permitida (true) o denegada (false).
*/
const cors = require('cors');
app.use(cors({
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));

// Recupera todas las películas o filtrar por género
app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) { // some: Es un método de los arrays que comprueba si al menos un elemento en el array cumple la condición.
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
    return res.json(filteredMovies);
  } else {
    res.json(movies);
  }
});

// Recupera una películas por id
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);

  if (movie) {
    return res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

// Crea una pelicula
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  } else {
    const newMovie = {
      id: crypto.randomUUID(),
      ...result.data
    };

    movies.push(newMovie);
    // Se necesita convertir el array movies en una cadena JSON antes de pasarlo a fs.writeFile
    const jsonContent = JSON.stringify(movies, null, 2);

    fs.writeFile('./movies.json', jsonContent, 'utf8', (error) => {
      if (error) {
        console.error('No se ha podido escribir el archivo movies.json, error:', error);
        process.exit(1);
      } else {
        res.status(201).json(newMovie);
      }
    });
  }
});

// Actualiza una película
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);
  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  // Las propiedades de result.data sobrescribirán las del objeto original.
  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  };
  movies[movieIndex] = updatedMovie;

  const jsonContent = JSON.stringify(movies, null, 2);
  fs.writeFile('./movies.json', jsonContent, 'utf8', (error) => {
    if (error) {
      console.error('No se ha podido escribir el archivo movies.json, error:', error);
      process.exit(1);
    } else {
      res.status(200).json(updatedMovie);
    }
  });
});

// Elimina una película solo del array movies, no del movies.json
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const deleteMovieIndex = movies.findIndex(movie => movie.id === id);

  if (deleteMovieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  movies.splice(deleteMovieIndex, 1);
  return res.status(200).json({ message: 'Movie deleted' });
});

// // Options para autorizar desde otros orígenes para solicitudes complejas como delete, put, post
// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin');
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) { // Se añade || !origin para al acceso desde nuestro propio servidor
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permite los encabezados necesarios
//   }
//   res.status(200);
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
