const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params : {
      apikey : '32b35285',
      s      : 'avengers',
    },
  });
  console.log(response.data);
};

fetchData();
