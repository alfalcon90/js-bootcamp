const apiURL = `https://api.lyrics.ovh`;

const form = document.querySelector('#form');
const search = document.querySelector('#search');
const result = document.querySelector('#result');
const more = document.querySelector('#more');

// Search by song or artist
const searchSongs = async (query) => {
  const res = await fetch(`${apiURL}/suggest/${query}`);
  const data = await res.json();

  showResults(data);
};

// Show data in DOM
const showResults = (results) => {
  result.innerHTML = `
    <ul class="songs">
      ${results.data
        .map(
          (song) =>
            `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`,
        )
        .join('')}
    </ul>
  `;

  if (results.prev || results.next) {
    more.innerHTML = `
      ${
        results.prev
          ? `<button class="btn" onclick="getMoreSongs('${results.prev}')">Previous</button>`
          : ''
      }
      ${
        results.next
          ? `<button class="btn" onclick="getMoreSongs('${results.next}')">Next</button>`
          : ''
      }
    `;
  } else [(more.innerHTML = '')];
};

// Get prev and next songs
const getMoreSongs = async (url) => {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showResults(data);
};

// Get lyrics
const getLyrics = async (artist, song) => {
  const res = await fetch(`${apiURL}/v1/${artist}/${song}`);
  const data = await res.json();
  console.log(data);
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  result.innerHTML = `
    <h2><strong>${artist}</strong> - ${song}</h2>
    <span>${lyrics}</span>
  `;
  more.innerHTML = '';
};

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchQuery = search.value.trim();

  if (!searchQuery) {
    alert('Please enter a search term');
  } else {
    searchSongs(searchQuery);
  }
});

result.addEventListener('click', (e) => {
  const element = e.target;

  if (element.tagName === 'BUTTON') {
    const artist = element.getAttribute('data-artist');
    const song = element.getAttribute('data-songtitle');
    getLyrics(artist, song);
  }
});
