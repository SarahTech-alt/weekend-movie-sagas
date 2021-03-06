import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAIL', fetchMovieDetail)
    yield takeEvery('FETCH_MOVIE_GENRE', fetchMovieGenre)
    yield takeEvery('ADD_NEW_MOVIE', addNewMovieDetails)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all error');
    }
}

function* fetchMovieDetail(action) {
    // get movie details from the DB
    try {
        const movieId = action.payload;
        const movieDetails = yield axios.get(`/api/movie/${movieId}`)
        yield put({ type: 'SET_MOVIE_DETAIL', payload: movieDetails.data })
    } catch {
        (error) =>
            console.log('get details error', error);
    }
}

function* fetchMovieGenre(action) {
    // get movie genre from the DB
    try {
        const movieId = action.payload;
        const movieDetails = yield axios.get(`/api/genre/${movieId}`)
        yield put({ type: 'SET_MOVIE_GENRE', payload: movieDetails.data })
    } catch {
        (error) =>
            console.log('get details error', error);
    }
}

function* addNewMovieDetails(action) {
    try {
        console.log(action);
        const movieInfo = action.payload;
        console.log(movieInfo);
        yield axios.post('/api/movie', movieInfo)
        yield put({ type: 'FETCH_MOVIES' })
    } catch {
        (error) =>
        console.log('error posting new movie', error)
    }
}



// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the selected movie information
const selectedMovieDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the selected movie genre(s)
const selectedMovieGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_GENRE':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovieDetails,
        selectedMovieGenres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
