import { Router, Request, Response } from 'express';
import { WeatherService } from '../../service/weatherService';
import { HistoryService } from '../../service/historyService';

const router = Router();

const postWeather = async (req: Request, res: Response): Promise<void> => {
  const { city, units } = req.body;
  
  if (!city) {
    res.status(400).json({ error: 'City name is required' });
    return;
  }

  try {
    const weatherData = await WeatherService.getWeatherData(city, units);
    await HistoryService.addCity({
      id: String(weatherData.city.id),
      name: weatherData.city.name
    });
    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const getHistory = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const deleteCity = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  try {
    await HistoryService.deleteCity(id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting city:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

router.post('/', postWeather);
router.get('/history', getHistory);
router.delete('/history/:id', deleteCity);

export default router;