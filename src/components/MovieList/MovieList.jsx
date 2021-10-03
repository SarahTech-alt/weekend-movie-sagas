import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';

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
        <main className="MovieList">
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
                <ImageList container spacing={8} gap={15} cols={5} >
                    {movies.map((movie) => (
                        <ImageListItem key={movie.poster}>
                            <img
                                src={movie.poster}
                                srcSet={movie.poster}
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