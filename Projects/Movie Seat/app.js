const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice;

// Update selected movie
const updateSelectedMovie = (movieIndex) => {
  // Store in LS
  localStorage.setItem('selectedMovie', JSON.stringify(movieIndex));
};

// Update total and count
const updateSelectedCount = () => {
  // Grab selected seats
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  // Create seats array
  const seatsIndex = [ ...selectedSeats ].map((seat) => [ ...seats ].indexOf(seat));

  // Store in LS
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  // Update text
  count.innerText = selectedSeatsCount;
  total.innerText = `$${selectedSeatsCount * ticketPrice}`;
};

// Populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const movieIndex = localStorage.getItem('selectedMovie');
  if (movieIndex !== null) {
    movieSelect.selectedIndex = movieIndex;
  } else {
    movieSelect.selectedIndex = 0;
  }
  ticketPrice = +movieSelect.value;
  updateSelectedCount();
};

// Event Listeners
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

movieSelect.addEventListener('change', () => {
  ticketPrice = +movieSelect.value;
  updateSelectedMovie(movieSelect.selectedIndex);
  updateSelectedCount();
});

// Start
populateUI();
