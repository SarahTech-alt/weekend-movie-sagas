import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

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
<<<<<<< Updated upstream
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img onClick={(event) => sendMovieDetail(movie.id)} src={movie.poster} alt={movie.title} />
                        </div>
                    );
                })}
=======
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
                <ImageList spacing={8} gap={15} cols={5} >
                    {movies.map((movie) => (
                        <ImageListItem key={movie.id}>
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
>>>>>>> Stashed changes
            </section>
        </main>

    );
}

export default MovieList;