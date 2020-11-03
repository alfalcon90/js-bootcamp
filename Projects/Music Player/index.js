const musicContainer = document.querySelector('#music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('#progress');
const progressContainer = document.querySelector('#progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Update song details
const loadSong = (song) => {
  title.innerText = song;
  audio.src = `audio/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
};

// Play song
const playSong = () => {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
  audio.play();
};

// Pause song
const pauseSong = () => {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
  audio.pause();
};

// Previous song
const prevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};

// Next song
const nextSong = () => {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

// Update progress
const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

// Set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Load song details into DOM
loadSong(songs[songIndex]);

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);
