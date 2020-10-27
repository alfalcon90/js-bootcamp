class Weather {
  constructor(city, state) {
    this.apiKey = ''; // Add your own Open Weather API Key
    this.city = city;
    this.state = this.stateCode(state);
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&units=imperial&appid=${this.apiKey}`)

    const responseData = await response.json();

    return responseData
  }

  // Change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = this.stateCode(state);
  }

  // Get state code - Not a comprehensive list
  stateCode(state) {
    switch(state) {
      case 'AL':
        state = 'Alabama';
        break;
      case 'FL':
        state = 'Florida';
        break;
      case 'CA':
        state = 'California';
        break;
      case 'CO':
        state = 'Colorado';
        break;
      case 'NY':
        state = 'New York';
        break;
      case 'WA':
          state = 'Washington';
          break;
    }
    return state
  }
}

