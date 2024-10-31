import logo from './logo.svg';
import './App.css';
import { useEffect, useState, memo, useCallback } from "react";
import { useSelector, useDispatch } from './react-redux'

function selectCount(state) {
    return state.count;
}

function increment() {
    return { type: 'INCREMENT' }
}

function decrement() {
    return { type: 'DECREMENT' }
}

export function Counter() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
            </div>
            {/* omit additional rendering output here */}
        </div>
    )
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

// const obj = {
//     movies: [
//         {
//         movie: 'spider',
//         actors: [
//             {name: 'tobey m'}
//         ]
//         }
//     ]
// }
//
// obj.movies[0].actors[0].name = 'Tobey M'
//
// actors[0] = {
//     name: 'Tobey M'
// }
//
// actors = [{
//     name: 'Tobey M'
// }, ...actors]
//
// movie = {
//     actors: [{
//         name: 'Tobey M'
//     }, ...actors]
// }
//
// 1) incapsulation
// 2) performance (immutability)










const MovieListItem = memo(({ id }) => {
  const title = useSelector(movieTitleSelector, [id]);
  const dispatch = useDispatch();

  return (
      <li>
        {title}
        <button onClick={() => {
          dispatch({ type: "DELETE", payload: {id} })
        }}>
          Удалить
        </button>
      </li>
  )
})

function MovieList() {

  const movies = useSelector((state) => state.movies, [])

  function handleRemove() {}
  const [index1, setIndex1] = useState('2')
  const [index2, setIndex2] = useState('1')
  const dispatch = useDispatch();

  return (
      <div className="App">
        <input value={index1} onChange={(event) => {setIndex1(event.target.value)}}/>
        <input value={index2} onChange={(event) => {setIndex2(event.target.value)}}/>
        <button onClick={(event) => {
            dispatch({
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
      <Counter/>
      <MovieList/>
    </div>
  );
}

export default App;
