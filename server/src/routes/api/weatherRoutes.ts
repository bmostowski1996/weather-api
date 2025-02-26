import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// Student's note: It's important to note the POST method on our website calls a 
// GET method from the OWM API. 

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // GET weather data from city name
  console.log('RUNNING WEATHER REQUEST');
  const cityName = req.body.cityName;
  const ws = new WeatherService(cityName);

  const arr = await ws.getWeatherForCity();
  console.log(`RETURNING ARRAY: ${arr}`);
  res.json(arr);

  // TODO: save city to search history
  HistoryService.addCity(cityName);
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  console.log(`GETTING SEARCH HISTORY`);
  const response = await HistoryService.getCities();
  console.log(`RESPONSE OBTAINED: ${response}`);
  res.json(response);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {});

export default router;
