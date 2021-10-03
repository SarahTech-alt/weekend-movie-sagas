import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

function MovieDetail() {
    // access movie details from the store
    const movieDetailsToDisplay = useSelector(store => store.selectedMovieDetails);
    // access movie genres from the store
    const movieGenresToDisplay = useSelector(store => store.selectedMovieGenres);
    // access useHistory functionality for navigation
    const history = useHistory();

    return (
        <>
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
                    <Link
                        underline="hover"
                        color="text.primary"
                        aria-current="page"
                    >
                        Movie Details
                    </Link>
                </Breadcrumbs>
            </div><br />
            {/* <p>{JSON.stringify(movieDetailsToDisplay)}</p> */}

            <Grid container justify="center"
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Card variant="outlined" sx={{ maxWidth: '40rem' }}>
                    <section className="detail">
                        <Grid item>
                            {/* map over selectedMovieDetails reducer
                     for movie title, poster and description
                    and display on DOM */}
                            {movieDetailsToDisplay.map(movie => {
                                return (
                                    <div key={movie.id} >
                                        <Typography style={{ wordWrap: "break-word" }}>{movie.title}</Typography>
                                        <img src={movie.poster} alt={movie.title} />
                                        <p>{movie.description}</p>
                                    </div>
                                );
                            })}
                        </Grid>
                        {/* map over selectedMovieGenres reducer
                     for movie genre
                    and display on DOM */}
                        <Grid item>
                            <p>Genre(s):</p>
                            {movieGenresToDisplay.map(genre => {
                                return (
                                    <div key={genre.id} >
                                        <p>{genre.name}</p>
                                    </div>
                                );
                            })}
                        </Grid>
                    </section>

                </Card>
            </Grid>
        </>
    );
}

export default MovieDetail;