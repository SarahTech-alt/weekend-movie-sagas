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
    // dispatch allows actions to be sent to sagas
    const dispatch = useDispatch();
    // useSelector allows access to redux store
    const movies = useSelector(store => store.movies);
    // access useHistory functionality for navigation
    const history = useHistory();

    // Sends information of clicked photo to sagas
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

    // On page load get all movies
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            {/* Navigation section
            shows user what page they are on and has link
             to take users to add movie page */}
            <div className="navigation">
                <Breadcrumbs sx={{ pl:'2%' }} aria-label="breadcrumb">
                    <Link underline="hover"
                        color="inherit" >
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
            <div className="MovieList">
            {/* Maps over all the items in the movies array
                that was accessed on page load */}
                <Grid container className="list-section" justify="center" alignItems="center">
            <ImageList 
            gap={15} cols={3}
            sx={{m:1, width:'50%', pl:'25%', pt:'2%'}}>
                {movies.map((movie) => (
                    <ImageListItem key={movie.id}>
                        <img
                            src={movie.poster}
                            srcSet={movie.poster}
                            alt={movie.title}
                            loading="lazy"
                            onClick={event => sendMovieDetail(movie.id)}
                        />
                        <ImageListItemBar
                            title={movie.title}
                            position="below"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            </Grid>
            </div>
        </main>
    );
}

export default MovieList;