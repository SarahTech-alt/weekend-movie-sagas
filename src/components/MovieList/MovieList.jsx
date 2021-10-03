import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    // access useHistory functionality for navigation
    const history = useHistory();

    const sendMovieDetail = (movieId) => {
        dispatch({
            type: 'FETCH_MOVIE_DETAIL',
            payload: movieId
        })
        dispatch({
            type: 'FETCH_MOVIE_GENRE',
            payload: movieId
        })
        history.push('/detail');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">

                <Grid sx={{ flexGrow: 2 }} container spacing={3}  >
                    {movies.map((movie) => (
                        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                            <Grid item key={movie.id} wrap="nowrap" >
                                <img
                                    src={`${movie.poster}?w=248&fit=crop&auto=format`}
                                    srcSet={`${movie.poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={movie.title}
                                    loading="lazy"
                                    onClick={(event) => sendMovieDetail(movie.id)}
                                />
                                <ImageListItemBar
                                    title={movie.title}
                                    position="below"
                                />
                            </Grid>

                        </Box>
                    ))}
                </Grid>


            </section>
        </main>

    );
}

export default MovieList;