import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteMovieList = (props) => {
  const { favoriteMovies, removeFavorite } = props;

  const handleClick = (id) => {
    removeFavorite(id);
  }

  return (<div className="col-xs savedContainer">
    <h5>Favorite Movies</h5>
    {props.favoriteMovies.map(movie => {
      return <div key={movie.id}>
        <Link className="btn btn-light savedButton" to={`/movies/${movie.id}`}>
          {movie.title}
          <span className="material-icons" onClick={() => handleClick(movie.id)}>remove_circle</span>
        </Link>
      </div>
    })}
  </div>);
}

export default FavoriteMovieList;
