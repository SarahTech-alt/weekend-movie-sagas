import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
                {/* Button to go back to movie list */}
                <button onClick={(event) => history.push('/')}>Go Back</button>
            </main>
        </>
    );
}

export default MovieDetail;