import React, { useState } from "react";
import { Link } from "react-router-dom";

const { nanoid } = require("nanoid")
const initialMovieState = {
    id: nanoid(5),
    title: '',
    director: '',
    genre: '',
    metascore: '', 
}

const AddMovieForm = (props) => {
    const [newMovie, setNewMovie] = useState(initialMovieState);

    const handleChange = (e) => {
        setNewMovie({...newMovie, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addMovie(newMovie);
    }

    return (
        <div className="col">
        <div className="modal-content">
            <form onSubmit={handleSubmit}>
            <div className="modal-header">
                <h4 className="modal-title">Adding New Movie</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                <label>Title</label>
                <input value={newMovie.title} onChange={handleChange} name="title" type="text" className="form-control" />
                </div>
                <div className="form-group">
                <label>Director</label>
                <input value={newMovie.director} onChange={handleChange} name="director" type="text" className="form-control" />
                </div>
                <div className="form-group">
                <label>Genre</label>
                <input value={newMovie.genre} onChange={handleChange} name="genre" type="text" className="form-control" />
                </div>
                <div className="form-group">
                <label>Metascore</label>
                <input value={newMovie.metascore} onChange={handleChange} name="metascore" type="number" className="form-control" />
                </div>
                <div className="form-group">
                <label>Description</label>
                <textarea value={newMovie.description} onChange={handleChange} name="description" className="form-control"></textarea>
                </div>

            </div>
            <div className="modal-footer">
                <input type="submit" className="btn btn-info" value="Save" />
                <Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel" /></Link>
            </div>
            </form>
        </div>
      </div>
    );
}

export default AddMovieForm;