import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

function MovieDetail() {
    // access movie details from the store
    const movieDetailsToDisplay = useSelector(store => store.selectedMovieDetails);
    // access movie genres from the store
    const movieGenresToDisplay = useSelector(store => store.selectedMovieGenres);
    // access useHistory functionality for navigation
    const history = useHistory();

    return (
        <>
            <main>
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
                {/* <p>{JSON.stringify(movieDetailsToDisplay)}</p> */}
                <section className="detail">
                    {/* map over selectedMovieDetails reducer
                     for movie title, poster and description
                    and display on DOM */}
                    {movieDetailsToDisplay.map(movie => {
                        return (
                            <div key={movie.id} >
                                <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title} />
                                <p>{movie.description}</p>
                            </div>
                        );
                    })}
                    {/* map over selectedMovieGenres reducer
                     for movie genre
                    and display on DOM */}
                    <p>Genre(s):</p>
                    {movieGenresToDisplay.map(genre => {
                        return (
                            <div key={genre.id} >
                                <p>{genre.name}</p>
                            </div>
                        );
                    })}
                </section>
            </main>
        </>
    );
}

export default MovieDetail;