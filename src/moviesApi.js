export async function getMovies() {
    const response = await fetch('https://dummyapi.online/api/movies');
    const json = await response.json();
    return json;
}

// export async function getMovies() {
//     return [
//         { id: 1, movie: 'Spider Man 1'},
//         { id: 2, movie: 'Spider Man 2'},
//         { id: 3, movie: 'Spider Man 3'},
//         { id: 4, movie: 'Spider Man 4'},
//         { id: 5, movie: 'Spider Man 5'},
//         { id: 6, movie: 'Spider Man 6'},
//         { id: 7, movie: 'Spider Man 7'},
//         { id: 8, movie: 'Spider Man 8'},
//         { id: 9, movie: 'Spider Man 9'},
//     ];
// }