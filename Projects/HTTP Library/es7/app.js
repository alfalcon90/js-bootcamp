const http = new EasyHTTP;

// Get Users
const users = http.get('https://jsonplaceholder.typicode.com/users')
  .then(data => data)
  .catch(err => err)

console.log(users);

// User Data
const data = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'jdoe@email.com'
}

// Create User
const post = http.post('https://jsonplaceholder.typicode.com/users', data)
  .then(data => data)
  .catch(err => err)

console.log(post);

// Update User
const update = http.put('https://jsonplaceholder.typicode.com/users/2', data)
  .then(data => data)
  .catch(err => err)

console.log(update);

// Delete User
const del = http.delete('https://jsonplaceholder.typicode.com/users/2')
  .then(data => data)
  .catch(err => err)

console.log(del);