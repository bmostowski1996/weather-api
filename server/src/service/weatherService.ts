import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number,
  lon: number
}
// TODO: Define a class for the Weather object
class Weather {

}
// TODO: Complete the WeatherService class
class WeatherService {
  // Define the baseURL, API key, and city name properties
  apiUrl: string = process.env.API_BASE_URL as string;
  apiKey: string = process.env.API_KEY as string;
  cityName: string; // This will get specified on initialization

  weather!: Weather; // This we'll need to figure out later...

  // Variables for queries
  geocodeQuery!: string;
  locationData!: any;
  cityCoords!: Coordinates;
  weatherQuery!: string;
  weatherData!: any[];

  constructor(cityName: string) {
    this.cityName = cityName;
  }

  // Create buildGeocodeQuery method
  private buildGeocodeQuery(cityName: string) {
    // Use this.cityName to build a query that allows us to get that city's coordinates.
    this.geocodeQuery = this.apiUrl + `/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
  }

  // Create fetchLocationData method
  private async fetchLocationData(geocodeQuery: string) {
    // Use this.geocodeQuery to fetch a city's location.
    if (geocodeQuery === undefined) {
      this.buildGeocodeQuery(this.cityName);
      geocodeQuery = this.geocodeQuery;
    }

    // It's just a simple fetch, we don't need to do much here...
    const respJSON = await (await fetch(geocodeQuery)).json() as any[];
    this.locationData = respJSON[0];
  }

  // Create destructureLocationData method
  private destructureLocationData(locationData: any) {
    // This process the fetch from fetchLocationData

    if (locationData === undefined) {
      this.fetchLocationData(this.geocodeQuery);
      locationData = this.locationData;
    }

    this.cityCoords = {
      lat: this.locationData.lat,
      lon: this.locationData.lon
    }
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(geocodeQuery: string) {
    await this.fetchLocationData(geocodeQuery);
    await this.destructureLocationData(this.locationData);
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coords: Coordinates): string {
    if (coords === undefined) {
      this.fetchAndDestructureLocationData(this.geocodeQuery);
      coords = this.cityCoords;
    }
    // Use a set of coordinates to construct a string we can use for making calls to the owm API
    this.weatherQuery = this.apiUrl + `/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(weatherQuery: string) {
    // It's just a simple fetch, we don't need to do much here...
    const respJSON = await (await fetch(weatherQuery)).json() as any[];
    this.weatherData = respJSON;
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}

  // TODO: Complete getWeatherForCity method
  // TODO: How will the helper calls work in this function?
  async getWeatherForCity() {
    
    // First, build a Geocode query based on our city
    this.buildGeocodeQuery(this.cityName);
    // Next, with our query, fetch and destructure location data, which we need to build a weather query
    this.fetchAndDestructureLocationData(this.geocodeQuery);

    // Next, build our weather query
    this.buildWeatherQuery(this.cityCoords);

    // Next, fetch weather data with our weather query 
    this.fetchWeatherData(this.weatherQuery);

    // Next, we need to parse the response we get from the weather data
    this.parseCurrentWeather(this.weatherData);

    // Finally, we build a forecast array with the parsed data
    this.buildForecastArray(this.parseData);
  }
}

export default new WeatherService();
