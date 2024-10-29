import { EventEmitter } from './emitter'
import { swapElements } from "./utils";

class Store extends EventEmitter {
    subscribers = []

    state = {
        movies: [
            {id: 1, movie: 'spider man'},
            {id: 2, movie: 'spider man 2'},
            {id: 3, movie: 'spider man 3'}
        ],
        count: 0
    }

    handleAction(action) {
        if (action.type === "DELETE") {
            this.state.movies = this.state.movies.filter((movie) => movie.id !== action.payload.id );
            this.state.deletedMovies.push(action.payload.id);

        } else if (action.type === "SWAP") {
            this.state.movies = swapElements(this.state.movies, action.payload.index1, action.payload.index2)
        } else if (action.type === "INCREMENT") {
            this.state.count += 1
        } else if (action.type === "DECREMENT") {
            this.state.count -= 1
        }

        this.dispatchEvent()
    }
}

class Store2 extends EventEmitter {
    subscribers = []

    state = {
        deletedMovies: [

        ]
    }

    handleAction(action) {
        if (action.type === "DELETE") {
            this.state.deletedMovies.push(action.payload.id);
        }

        this.dispatchEvent()
    }
}

export function createStore() {
    return new Store()
}