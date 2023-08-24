// api token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNThmZjZhODdiMmYyN2NkYTMzNDgzOTZiNzQ3MmJjNCIsInN1YiI6IjY0ZTc5ZDQwZTg5NGE2MDBjNzI4MDQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xZu5zS1Ok0eJ64ju_bbi0U3BiJY11w7LfyCmWdnqfgM

const global = {
    currentPage: window.location.pathname,
};

async function displayPopularMovies() {
    const results = await fetchAPIData('movie/popular');

    console.log(results);
}

// Fetch data from TMDB API (Production this would be made on the server for security reasons)
async function fetchAPIData(endpoint) {
    const API_KEY = 'e58ff6a87b2f27cda3348396b7472bc4';
    const API_URL = 'https://api.themoviedb.org/3/';

    const res = await fetch(`${API_URL}${endpoint}?api-key=${API_KEY}&language=en-US`);

    const data = await res.json();

    return data;
}

// Highlight Active Link
function highlightActiveLink() {
    const li = document.querySelectorAll('.nav-link');
    li.forEach((li) => {
        if (li.getAttribute('href') === global.currentPage) {
            li.classList.add('active');
        }
    });
}


// Init App - Simple Router
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink(); 
}

document.addEventListener('DOMContentLoaded', init);