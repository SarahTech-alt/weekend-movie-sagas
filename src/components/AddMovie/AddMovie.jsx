import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';



function AddMovie() {
    
    // All available genres of movies in the database
    const genres = {
        Adventure: 1,
        Animated: 2,
        Biographical: 3,
        Comedy: 4,
        Disaster: 5,
        Drama: 6,
        Epic: 7,
        Fantasy: 8,
        Musical: 9,
        Romantic: 10,
        ScienceFiction: 11,
        SpaceOpera: 12,
        Superhero: 13,
    }

    // access useHistory functionality for navigation
    const history = useHistory();
    // access useDispatch functionality to dispatch actions to sagas
    const dispatch = useDispatch();


    // Create a movieToAdd variable to hold inputs and send to the saga
    const [movieToAdd, setMovieToAdd] = useState({
        title: '',
        poster: '',
        description: '',
        genre_id: '',
    })

    // Dispatch inputted movie information to the addNewMovie saga
    // and selected genres to addNewMovieGenres saga
    const postMovie = () => {
        console.log('movie to add', movieToAdd);
        dispatch({
            type: 'ADD_NEW_MOVIE',
            payload: movieToAdd
        })
        history.push('/');
    }

    return (
        <Box >
            {/* Navigation section
            shows user what page they are on and has link
             to take users to movie list page */}
        <div className="navigation">
        <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" 
                    color="inherit" 
                    onClick={event => history.push('/')}>
                        Movie List
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={event => history.push('/add')}
                    >
                        Add Movie
                    </Link>
                </Breadcrumbs>
                </div>
                <br />
                {/* Form for users to input data for new movie 
                Title and description are required
                When the form is submitted the movieToAdd
                variable is updated with form input values*/}
        <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '15rem' },
                color: 'text.primary' 
            }}
            noValidate
            autoComplete="off">
            <div className="addMovie">
                <FormControl >
                    <h2>Add Movie:</h2>
                    <TextField
                        required
                        id="movie-title-input"
                        label="Title"
                        onChange={(event) => setMovieToAdd({ ...movieToAdd, title: event.target.value })}
                        value={movieToAdd.title}
                    />
                    <TextField
                        required
                        id="movie-description-input"
                        label="Description"
                        multiline
                        minRows={4}
                        onChange={(event) => setMovieToAdd({ ...movieToAdd, description: event.target.value })}
                        value={movieToAdd.description}
                    />
                    <TextField
                        id="poster-url-input"
                        label="Poster URL"
                        onChange={(event) => setMovieToAdd({ ...movieToAdd, poster: event.target.value })}
                        value={movieToAdd.poster}
                    />
                </FormControl>
            </div>
            <div>
                <FormControl sx={{ m: 1, width: '15rem' }}>
                    <InputLabel id="genre-select-label">Genre</InputLabel>
                    <Select
                        labelId="genre-simple-select-label"
                        id="genre-simple-select"
                        value={movieToAdd.genre_id}
                        label="Genre"
                        onChange={(event) =>setMovieToAdd({ ...movieToAdd, genre_id: event.target.value })}
                    >
                        <MenuItem value={genres.Adventure}>Adventure</MenuItem>
                        <MenuItem value={genres.Animated}>Animated</MenuItem>
                        <MenuItem value={genres.Biographical}>Biographical</MenuItem>
                        <MenuItem value={genres.Comedy}>Comedy</MenuItem>
                        <MenuItem value={genres.Disaster}>Disaster</MenuItem>
                        <MenuItem value={genres.Drama}>Drama</MenuItem>
                        <MenuItem value={genres.Epic}>Epic</MenuItem>
                        <MenuItem value={genres.Fantasy}>Fantasy</MenuItem>
                        <MenuItem value={genres.Musical}>Musical</MenuItem>
                        <MenuItem value={genres.Romantic}>Romantic</MenuItem>
                        <MenuItem value={genres.ScienceFiction}>Science Fiction</MenuItem>
                        <MenuItem value={genres.SpaceOpera}>Space-Opera</MenuItem>
                        <MenuItem value={genres.Superhero}>Superhero</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {/* Cancel button navigates user back to movie list page */}
            <Button onClick={(event) => history.push('/')} variant="contained" sx={{ m: 1, position: 'justify' }}>Cancel</Button>
            {/* Submit button calls the postMovie function
            to send to the the saga */}
            <Button onClick={(event) => postMovie()} variant="contained" sx={{ m: 1, position: 'justify' }}>Add Movie</Button>
        </Box>
        </Box>
    );
}

export default AddMovie;