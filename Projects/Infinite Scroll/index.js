const postsContainer = document.querySelector('#posts-container');
const loader = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 5;
let page = 1;

// Fetch posts from API
const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
  );
  const data = await res.json();
  return data;
};

// Show posts in DOM
const showPosts = async () => {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEL = document.createElement('div');
    postEL.classList.add('post');
    postEL.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postEL);
  });
};

// Show loader and fetch more posts
const showLoader = () => {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
};

// Filter posts
const filterPosts = (e) => {
  const query = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();

    if (title.indexOf(query) !== -1 || body.indexOf(query) !== -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
};

// Event Listeners
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});
filter.addEventListener('input', filterPosts);

// Show initial posts
showPosts();
