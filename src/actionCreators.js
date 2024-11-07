
export function deleteMoviesStartingFromIdActionCreator(id) {
    return (dispatch, getState) => {
        const movies = getState().movies;
        const count = getState().count;
        const firstIndex = movies.findIndex((movie) => {
            return movie.id = id;
        });
        for (let i = firstIndex; i < firstIndex + count; i++) {
            debugger
            const movieId = movies[i].id;
            dispatch({ type: "DELETE", payload: {id: movieId} })
        }
        return true;
    }
}