import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate, useParams, useNavigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);


  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const deleteMovie = (id) => {
    console.log("Delete movie " + id);
    axios.delete(`http://localhost:9000/api/movies/${id}`)
      .then(res => {
        setMovies(res.data);
        // OR setMovies(movies.filter(movie => movie.id !== id));
        navigate("/movies")
      })
      .catch(err => console.error(err))
  }

  const addMovie = (movie => {
    axios.post(`http://localhost:9000/api/movies`, movie)
      .then(res => {
        setMovies(res.data);
        navigate("/movies");
      })
      .catch(err => console.error(err));
  })

  const addToFavorites = (movie) => {
    if(favoriteMovies.filter(m => m.id === movie.id).length === 0) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  }
  
  const removeFavorite = (id) => {
    setFavoriteMovies(favoriteMovies.filter(movie => movie.id !== id));
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} removeFavorite={removeFavorite}/>

          <Routes>

            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies}/>} />

            <Route path="movies/:id" element={<Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites} />}/>

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/movies/add" element={<AddMovieForm addMovie={addMovie}/>} />

            <Route path="/" element={<Navigate to="/movies" />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
