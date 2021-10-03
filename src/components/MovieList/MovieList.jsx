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
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

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
            <section className="movies">
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
                <ImageList sx={{ width: '100%', height: 500 }} container spacing={8} gap={15} cols={5}  >
                    {movies.map((movie) => (

                        <ImageListItem key={movie.poster}>
                            <img
                                src={`${movie.poster}?w=248&fit=crop&auto=format`}
                                srcSet={`${movie.poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={movie.title}
                                loading="lazy"
                                onClick={event=>sendMovieDetail(movie.id)}
                            />

                            <ImageListItemBar
                                title={movie.title}
                                position="below"
                            />

                        </ImageListItem>

                    ))}
                </ImageList>


            </section>
        </main>

    );
}

export default MovieList;