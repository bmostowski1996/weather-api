import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;
const apiUrl = process.env.API_BASE_URL;
const apiKey = process.env.API_KEY;

const ktv = (kelvin: number): number => {
    return (kelvin - 273.15)*(9/5) + 32;
}
// TODO: Serve static files of entire client dist folder

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implement middleware to connect the routes
// routes/index.ts and routes/api/index.ts define how our routes are mounted to the server
// Routes in routes/htmlRoutes.ts are mounted to /api.
// Routes in routes/api/weatherRoutes.ts are mounted to /api/weather.
app.use(routes);

// This needs to get moved into htmlRoutes.ts...
app.post('/api/weather/', async (req, res) => {
    
    const {cityName} = req.body;

    if (!cityName) {
        return res.status(400).json({ error: 'City name is required!'});
    }
    
    // Now that we have our city name, let's make a request to the openweather API
    
    // We need to make a preliminary call to the API first to retrieve our city's coordinates
    let coords = {
        lat: 0,
        lon: 0,
    }
    try {
        const response = await fetch(apiUrl + `/data/2.5/weather?q=${cityName},us&appid=${apiKey}`);
        coords = (await response.json()).coords;
    } catch(error) {
        return res.status(400).json({ error: 'City name is invalid!'});
    }

    const weatherData = [];
    // Once we have our coords, we can make our main call to the API
    try {
        const response = await fetch(apiUrl + `/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`);
        const baseData = await response.json();

        // TODO: process weatherData correctly so that our client can read files as expected.
        const presentData = baseData.list[0];
        weatherData.push({
            city: cityName,
            date: (new Date(presentData.dt * 1000)).toISOString(),
            icon: presentData.weather.icon,
            iconDescription: presentData.weather.description,
            tempF: ktv(presentData.main.temp),
            windSpeed: presentData.wind.speed,
            humidity: presentData.main.humidity
        });

    } catch(error) {
        return res.status(400).json({ error: 'Request for weather forecast failed!'});
    }
    console.log(weatherData);
    res.json({data: weatherData});
});

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
