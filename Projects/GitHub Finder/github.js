class Github {
  constructor() {
    this.client_id = '';
    this.client_secret = '';
    this.repos_count = 5;
    this.repos_sort = 'created: asc'
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}`); 
    // Query parameters deprecated by GitHub
    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}