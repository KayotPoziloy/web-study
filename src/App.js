import logo from './logo.svg';
import React from "react";
import './App.css';
import { useEffect, useState, memo, useCallback } from "react";
import {useSelector, useDispatch, useBindActionCreator} from './react-redux'
import { getMovies } from './moviesApi'
import {render} from "@testing-library/react";
import {deleteMoviesStartingFromId, deleteMoviesStartingFromIdActionCreator} from "./actionCreators";

function selectCount(state) {
    return state.count;
}

function increment() {
    return { type: 'INCREMENT' }
}

function decrement() {
    return { type: 'DECREMENT' }
}

class Image extends React.PureComponent {

    state = {clicked: false}

    componentDidMount() {
        console.log("didMount", this.props.id);
        const myDiv = document.getElementById(this.props.id);
    }

    render() {
        const result = (
            <div id={this.props.id}>
                {this.props.src}
                текст
                <img alt={"картинка"} onClick={() => {
                    this.setState({ clicked: true })
                }}/>
                {this.state.clicked ? "yes" : "no"}
            </div>
        )
        return result;
    }

    componentWillUnmount() {
        console.log(this.props.id, this.props.src);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("did update", this.props.id);
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.src !== this.props.src || nextProps.id !== this.props.id;
    //     // console.log("should update", this.props.id);
    // }
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

const MovieListItem = memo((props) => {
  const id = props.id;
  const title = useSelector(movieTitleSelector, [id]);
  const deleteMoviesStartingFromId = useBindActionCreator(deleteMoviesStartingFromIdActionCreator);

  console.count('render')

  return (
      <li>
        <Image src={title} id={id}/>
        {title}
        <button onClick={() => {
            const result = deleteMoviesStartingFromId(id)
            console.log(result)
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

  useEffect(() => {
      (async () => {
          dispatch({ type: 'NEWMOVIES', payload: {json: await getMovies()} })
      })()
  }, [])

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
