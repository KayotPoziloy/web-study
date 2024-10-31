import {swapElements} from "./utils";
import {combineReducers, createStore} from "./redux";

const initState = {
    movies: [
        {id: 1, movie: 'spider man'},
        {id: 2, movie: 'spider man 2'},
        {id: 3, movie: 'spider man 3'}
    ],
    deletedMovies: [],
    count: 0
}

const rootReducer = combineReducers({
    movies: moviesReducer,
    deletedMovies: deletedMoviesReducer,
    count: countReducer,
})

function moviesReducer(prevState, action) {
    if (action.type === 'DELETE') {
        return prevState.filter((movie) => movie.id !== action.payload.id );
    } else if (action.type === 'SWAP') {
        return swapElements(prevState, action.payload.index1, action.payload.index2);
    }
    return prevState
}

function countReducer(prevState, action) {
    if (action.type === "INCREMENT") {
        return prevState + 1
    } else if (action.type === "DECREMENT") {
        return prevState - 1
    }
    return prevState
}

function deletedMoviesReducer(prevState, action) {
    if (action.type === "DELETE") {
        return [...prevState, action.payload.id]
    }
    return prevState
}

export const store = createStore(initState, rootReducer);
