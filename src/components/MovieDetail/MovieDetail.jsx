import { useSelector } from 'react-redux';

function MovieDetail() {
    // access movie details from the store
    const movieDetailsToDisplay = useSelector(store => store.selectedMovieDetails);
    // access movie genres from the store
    const movieGenresToDisplay = useSelector(store => store.selectedMovieGenres);

    return (
        <>
            <main>
                {/* <p>{JSON.stringify(movieDetailsToDisplay)}</p> */}
                <section className="detail">
                    {movieDetailsToDisplay.map(movie => {
                        return (
                            <div key={movie.id} >
                                <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title} />
                                <p>{movie.description}</p>
                            </div>
                        );
                    })}
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