"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherService_1 = require("../../service/weatherService");
const historyService_1 = require("../../service/historyService");
const router = (0, express_1.Router)();
const postWeather = async (req, res) => {
    const { city, units } = req.body;
    if (!city) {
        res.status(400).json({ error: 'City name is required' });
        return;
    }
    try {
        const weatherData = await weatherService_1.WeatherService.getWeatherData(city, units);
        await historyService_1.HistoryService.addCity({
            id: String(weatherData.city.id),
            name: weatherData.city.name
        });
        res.json({ weather: weatherData });
    }
    catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
const getHistory = async (_req, res) => {
    try {
        const cities = await historyService_1.HistoryService.getCities();
        res.json(cities);
    }
    catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
const deleteCity = async (req, res) => {
    const { id } = req.params;
    try {
        await historyService_1.HistoryService.deleteCity(id);
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Error deleting city:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
router.post('/', postWeather);
router.get('/history', getHistory);
router.delete('/history/:id', deleteCity);
exports.default = router;
