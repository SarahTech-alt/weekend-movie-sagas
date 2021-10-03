import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

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
        <main className="MovieList">
            {/* Navigation section
            shows user what page they are on and has link
             to take users to add movie page */}
            <div className="navigation">
                <Breadcrumbs aria-label="breadcrumb">
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
            {/* Maps over all the items in the movies array
                that was accessed on page load */}
            <ImageList spacing={8} gap={15} cols={5} >
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
        </main>
    );
}

export default MovieList;