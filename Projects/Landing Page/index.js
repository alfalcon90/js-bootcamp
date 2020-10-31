const toggle = document.querySelector('#toggle');
const close = document.querySelector('#close');
const open = document.querySelector('#open');
const modal = document.querySelector('#modal');

// Toggle nav
toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

// Show modal
open.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

// Close modal
close.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});
window.addEventListener('click', (e) => {
  e.target === modal ? modal.classList.remove('show-modal') : false;
});
