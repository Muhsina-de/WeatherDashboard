"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
class WeatherService {
    static async getWeatherData(city, units = 'metric') {
        try {
            if (!this.API_KEY) {
                throw new Error('OpenWeather API key is not configured');
            }
            const url = `${this.BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=${units}`;
            const response = await axios_1.default.get(url);
            if (!response.data || !response.data.list) {
                throw new Error('Invalid response format from weather API');
            }
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new Error('API key is inactive or invalid');
                }
                throw new Error(`Weather API error: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }
}
exports.WeatherService = WeatherService;
WeatherService.API_KEY = process.env.OPENWEATHER_API_KEY;
WeatherService.BASE_URL = 'https://api.openweathermap.org/data/2.5';
