import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function AddMovie() {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
  
    // All available genres of movies in the database
    const genres = ['Adventure', 'Animated',  'Biographical', 'Comedy', 'Disaster', 'Drama', 'Epic', 'Fantasy', 'Musical', 'Romantic', 'Science Fiction', 'Space-Opera', 'Superhero'];

     // access useHistory functionality for navigation
     const history = useHistory();
     // access useDispatch functionality to dispatch actions to sagas
    const dispatch = useDispatch();
  

    // Create a movieToAdd variable to hold inputs and send to the saga
    const [movieToAdd, setMovieToAdd] = useState({
        movieTitle: '',
        movieUrl: '',
        movieDescription: '',
        genres: [],
    })
  
    // Gets the value of selected items
    // separates them by comma and sets to movieGenre array
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setMovieToAdd({...movieToAdd, genres:
          // On autofill we get a the stringified value.
          typeof value === 'string' ? value.split(',') : value,
        });
      };

      // Dispatch inputted movie information to the addNewMovie saga
      // and selected genres to addNewMovieGenres saga
      const postMovie = () => {
        //   console.log('Future Id', movieToAddId);
        //   console.log('Existing Movies', currentMovies);
         console.log('movie to add', movieToAdd);
          dispatch({
            type: 'ADD_NEW_MOVIE',
            payload: movieToAdd
        })
        dispatch({
            type: 'ADD_NEW_MOVIE_GENRE',
            payload: movieToAdd
        })
    }

    return (
            <Box component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                <div>
                    <FormControl>
                        <TextField
                            required
                            id="movie-title-input"
                            label="Title"
                            onChange={(event) => setMovieToAdd({...movieToAdd, movieTitle: event.target.value})}
                            value={movieToAdd.movieTitle}
                        />
                        <TextField
                            required
                            id="movie-description-input"
                            label="Description"
                            multiline
                            minRows={4}
                            onChange={(event) => setMovieToAdd({...movieToAdd, movieDescription: event.target.value})}
                            value={movieToAdd.movieDescription}
                        />
                        <TextField
                            id="poster-url-input"
                            label="Poster URL"
                            onChange={(event) => setMovieToAdd({...movieToAdd, movieUrl: event.target.value})}
                            value={movieToAdd.movieUrl}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id="genre-multiple-checkbox-label">Genre</InputLabel>
                        <Select
                            labelId="genre-multiple-checkbox-label"
                            id="genre-checkbox"
                            multiple
                            value={movieToAdd.genres}
                            onChange={handleChange}
                            input={<OutlinedInput label="Genre" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {genres.map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                    <Checkbox checked={movieToAdd.genres.indexOf(genre) > -1} />
                                    <ListItemText primary={genre} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <Button onClick={(event) => history.push('/')} variant="contained" sx= {{ m: 1, position: 'justify' }}>Cancel</Button>
                <Button onClick={(event) => postMovie()}variant="contained" sx ={{ m:1, position: 'justify' }}>Add Movie</Button>
        </Box>
    );
}

export default AddMovie;