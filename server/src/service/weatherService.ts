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
  // TODO: Define the baseURL, API key, and city name properties
  apiUrl: string = process.env.API_BASE_URL as string;
  apiKey: string = process.env.API_KEY as string;
  cityName: string;
  weather!: Weather;

  // TODO: Create fetchLocationData method
  // What is this function supposed to do?
  // Hypothesis: Given a query string representing a query for a CITY, get that city's coordinates
  private async fetchLocationData(query: string) {}

  // TODO: Create destructureLocationData method
  // What is this function supposed to do?
  private destructureLocationData(locationData: Coordinates): Coordinates {}

  // TODO: Create buildGeocodeQuery method
  // Hypothesis: Use the class's defined apiUrl, apiKey, and cityName variables to form a Geocode query
  private buildGeocodeQuery(): string {}

  // TODO: Create buildWeatherQuery method
  // Use a set of coordinates to construct a string we can use for making calls to the owm API
  private buildWeatherQuery(coordinates: Coordinates): string {}

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    this.fetchLocationData();
    this.destructureLocationData();
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {}

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}

  // TODO: Complete getWeatherForCity method
  // TODO: How will the helper calls work in this function?
  async getWeatherForCity(city: string) {}
    
    // General flowchart...

    // First, build a Geocode query based on our city
    this.buildGeocodeQuery();

    // Next, with our query, fetch and destructure location data, which we need to build a weather query
    this.fetchAndDestructureLocationData();

    // Next, build our weather query
    weatherQuery = this.buildWeatherQuery(this.cityCoords);

    // Next, fetch weather data with our weather query 
    this.fetchWeatherData();

    // Next, we need to parse the response we get from the weather data
    this.parseCurrentWeather();

    // Finally, we build a forecast array with the parsed data
    this.buildForecastArray();

}

export default new WeatherService();
