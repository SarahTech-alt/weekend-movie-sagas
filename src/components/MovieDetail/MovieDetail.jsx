import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

function MovieDetail() {
    // useSelector allows access to movie details from the store
    // accessing to reducers so have two selectors
    const movieDetailsToDisplay = useSelector(store => store.selectedMovieDetails);
    const movieGenresToDisplay = useSelector(store => store.selectedMovieGenres);
    // access useHistory functionality for navigation
    const history = useHistory();

    return (
        <>
        {/* Navigation section
            shows user what page they are on and has links
            to take users back to movie list and
             one to take users to add movie page */}
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
            {/* Create a grid to put mapped items into */}
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