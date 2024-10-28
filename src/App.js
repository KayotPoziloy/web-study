import logo from './logo.svg';
import './App.css';
import { useEffect, useState, memo, useCallback } from "react";

// function arraysIdentical(array1, array2) {
//   for (let i =0; i< array1.length; i++) {
//     if (array1[i] !== array2[i]) {
//       false
//     }
//     return true
//   }
// }
//
// function myMemo(functionBody, {cacheLimit}) {
//   let prevArgs = []
//   let prevResult = null;
//   return (...args) => {
//
//     if (args.length !== prevArgs.length || !arraysIdentical(args, prevArgs)) {
//        prevResult = functionBody(args);
//        prevArgs = args
//        return prevResult;
//     }
//
//
//     return prevResult
//   }
//
// }
//
// const memoizedCalculation = myMemo((a, b) => a* b, {cacheLimit: 1000})
// memoizedCalculation(1000, 1000000);
// memoizedCalculation(1000, 1000000);

function useStore() {

}

// { type: "DELETE", payload: {id: '123123'} }
class Store {
    subscribers = []

    state = {
        movies: [
            {id: 1, movie: 'spider man'},
            {id: 2, movie: 'spider man 2'},
            {id: 3, movie: 'spider man 3'}
        ]
    }

    handleAction(action) {
        if (action.type === "DELETE") {
            this.state.movies = this.state.movies.filter((movie) => movie.id !== action.payload.id );
            debugger
        } else if (action.type === "SWAP") {
            this.state.movies = swapElements(this.state.movies, action.payload.index1, action.payload.index2)
            debugger
        }

        this.dispatchEvent()
    }

    subscribe(callback) {
        this.subscribers.push(callback)
        return () => {
            this.subscribers = this.subscribers.filter((s) => callback !== s)
        }
    }

    dispatchEvent() {
        this.subscribers.forEach((subscriber) => {
            subscriber();
        })
    }
}

const myStore = new Store()

class Dispatcher {
    dispatch(action) {
        myStore.handleAction(action)
    }
}

const dispatcher = new Dispatcher();

// function useMovies() {
//   const [movies, setMovies] = useState([])
//
//   useEffect(() => {
//     async function func() {
//       const response = await fetch('https://dummyapi.online/api/movies');
//       const json = await response.json();
//       setMovies(json)
//     }
//
//     func()
//   }, []);
//
//   // const handleRemove = useCallback((id) => {
//   //   setMovies((movies) => movies.filter((movie) => movie.id !== id ));
//   // }, [])
//
//   return { movies, handleRemove, setMovies }
// }


function useDataFromStore(selector, deps) {
    const [state, setState] = useState(selector(myStore.state, ...deps));
    useEffect(() => {
        const unsubscribe = myStore.subscribe(() => {
            setState(selector(myStore.state, ...deps));
        });

        return () => {
            unsubscribe()
        }
    }, deps);
    return state;
}

function movieTitleSelector(state, id) {
    const newMovie = state.movies.find(
        (movie) => movie.id === id
    )
    if (newMovie) {
        return newMovie.movie
    } else {
        return ""
    }
}

const MovieListItem = memo(({ id }) => {
  const title = useDataFromStore(movieTitleSelector, [id]);

  return (
      <li>
        {title}
        <button onClick={() => {
          dispatcher.dispatch({ type: "DELETE", payload: {id} })
        }}>
          Удалить
        </button>
      </li>
  )
})

function swapElements(array, index1, index2) {
    const num1 = array[index1]
    const num2 = array[index2]

    array[index2] = num1
    array[index1] = num2

    return [...array]
}

function MovieList() {

  const movies = useDataFromStore((state) => state.movies, [])

  function handleRemove() {}
  const [index1, setIndex1] = useState('2')
  const [index2, setIndex2] = useState('1')

  return (
      <div className="App">
        <input value={index1} onChange={(event) => {setIndex1(event.target.value)}}/>
        <input value={index2} onChange={(event) => {setIndex2(event.target.value)}}/>
        <button onClick={(event) => {
            dispatcher.dispatch({
                type: "SWAP",
                payload: { index1: parseInt(index1), index2: parseInt(index2) }
            });
        }}>swap</button>
        <ul>
          {movies.map((obj) =>
              <MovieListItem key={obj.id} id={obj.id}/>
          )}
        </ul>
      </div>
  );
}

function App() {
  return (
    <div className="App">
      <MovieList/>
    </div>
  );
}

export default App;
