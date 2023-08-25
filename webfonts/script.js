// api key: e58ff6a87b2f27cda3348396b7472bc4
// api token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNThmZjZhODdiMmYyN2NkYTMzNDgzOTZiNzQ3MmJjNCIsInN1YiI6IjY0ZTc5ZDQwZTg5NGE2MDBjNzI4MDQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xZu5zS1Ok0eJ64ju_bbi0U3BiJY11w7LfyCmWdnqfgM

const global = {
    currentPage: window.location.pathname,
};

async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular'); 

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = 
        `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` 
            : `<img src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
          />`}
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

        document.querySelector('#popular-movies').appendChild(div);
    });
}

async function displayPopularShows() {
    const { results } = await fetchAPIData('tv/popular');
    
    results.forEach((show) => {
        const year = `${show.first_air_date}`.slice(0,4);

        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = 
        `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path 
              ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` 
             : `<img src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
          />`}
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${year}</small>
            </p>
          </div>
        `;
        
        document.querySelector('#popular-shows').appendChild(div); 
    });
}

// Display movie Details
async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1]; 

    const movie = await fetchAPIData(`movie/${movieId}`);

// overlay for bg image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML= 
    `
    <div class="details-top">
          <div>
          ${
            movie.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top rounded-corners"
            alt="${movie.title}"
          />` 
          : `<img src="images/no-image.jpg"
            class="card-img-top rounded-corners"
            alt="${movie.title}"
        />`}
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5 class="text-secondary">Genres:</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">${movie.title} Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommas(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommas(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
        </div>
        `;

        document.querySelector('#movie-details').appendChild(div);
}

// Display TV Show Details
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1]; 

  const show = await fetchAPIData(`tv/${showId}`);

// overlay for bg image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML= 
  `
  <div class="details-top">
        <div>
        ${
          show.poster_path ? `<img
          src="https://image.tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top rounded-corners"
          alt="${show.name}"
        />` 
        : `<img src="images/no-image.jpg"
          class="card-img-top rounded-corners"
          alt="${show.name}"
      />`}
        </div>
        <div>
          <h2>${show.name}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average.toFixed(1)} / 10
          </p>
          <p class="text-muted">Release Date: ${show.first_air_date}</p>
          <p>
            ${show.overview}
          </p>
          <h5 class="text-secondary">Genres:</h5>
          <ul class="list-group">
            ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
          </ul>
          <a href="${show.homepage}" target="_blank" class="btn">${show.name} Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
          <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
          <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
        ${show.production_companies
          .map((company) => `<span>${company.name}</span>`)
          .join(', ')}</div>
      </div>
      `;

      document.querySelector('#show-details').appendChild(div);
}

// Display background details image
function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '80vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0'
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
    

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    };
    
};

// Fetch data from TMDB API (Production this would be made on the server for security reasons)
async function fetchAPIData(endpoint) {
    const API_KEY = 'e58ff6a87b2f27cda3348396b7472bc4';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await res.json();

    hideSpinner();

    return data;
}

// Show the spinner while loading
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

// Hide the spinner after loading
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
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

// Adding commas to the budgets and revenues (thanks Stack Overflow)
function addCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Init App - Simple Router
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink(); 
}

document.addEventListener('DOMContentLoaded', init);