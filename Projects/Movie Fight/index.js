const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.poster_path === null ? '' : `http://image.tmdb.org/t/p/w300${movie.poster_path}`;
    return `
    <img src="${imgSrc}"/>
    ${movie.title} (${movie.release_date.slice(0, 4)})
    `;
  },
  inputValue(movie) {
    return movie.title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params : {
        api_key : '',
        query   : searchTerm,
      },
    });

    return response.data.results;
  },
};

createAutoComplete({
  ...autoCompleteConfig,
  root           : document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root           : document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
});

let leftMovie;
let rightMovie;

// Select movie
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
    params : {
      api_key : '',
    },
  });
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  const leftSideStats = document.querySelectorAll('#left-summary .notification');
  const rightSideStats = document.querySelectorAll('#right-summary .notification');

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftSideValue = parseFloat(leftStat.dataset.value);
    const rightSideValue = parseFloat(rightStat.dataset.value);

    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
      rightStat.classList.add('is-primary');
      rightStat.classList.remove('is-warning');
    } else if (rightSideValue < leftSideValue) {
      leftStat.classList.add('is-primary');
      leftStat.classList.remove('is-warning');
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  });
};

// Movie details template
const movieTemplate = (movieDetail) => {
  const imgSrc = movieDetail.poster_path === null ? '' : `http://image.tmdb.org/t/p/w300${movieDetail.poster_path}`;

  // Detail strings
  const genreStr = movieDetail.genres.map((genre) => genre.name).join(', ');
  const overviewStr = movieDetail.overview.slice(0, 180) + (movieDetail.overview.length > 180 ? '...' : '');
  const revenueStr = `$${movieDetail.revenue.toLocaleString()}`;
  const votesStr = movieDetail.vote_count.toLocaleString();

  // Comparison numbers
  const popularity = Math.round(movieDetail.popularity);
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${imgSrc}">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.title}</h1>
          <h4>${genreStr}</h4>
          <p>${overviewStr}</p>
        </div>
      </div>
    </article>
      <article data-value=${movieDetail.revenue} class="notification is-primary">
        <p class="title">${revenueStr}</p>
        <p class="subtitle">Box Office</p>
      </article>
      <article data-value=${movieDetail.vote_average} class="notification is-primary">
        <p class="title">${movieDetail.vote_average}</p>
        <p class="subtitle">Vote Average</p>
      </article>
      <article data-value=${movieDetail.vote_count} class="notification is-primary">
        <p class="title">${votesStr}</p>
        <p class="subtitle">Votes</p>
      </article>
      <article data-value=${popularity} class="notification is-primary">
        <p class="title">${popularity}</p>
        <p class="subtitle">Popularity</p>
      </article>
  `;
};
