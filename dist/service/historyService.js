"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const uuid_1 = require("uuid");
class HistoryService {
    static async getCities() {
        return this.cities;
    }
    static async addCity(city) {
        const newCity = { ...city, id: (0, uuid_1.v4)() };
        this.cities.push(newCity);
    }
    static async deleteCity(id) {
        this.cities = this.cities.filter(city => city.id !== id);
    }
}
exports.HistoryService = HistoryService;
HistoryService.cities = [];
