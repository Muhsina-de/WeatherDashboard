import { v4 as uuidv4 } from 'uuid';

interface City {
  id: string;
  name: string;
}

export class HistoryService {
  private static cities: City[] = [];

  static async getCities(): Promise<City[]> {
    return this.cities;
  }

  static async addCity(city: City): Promise<void> {
    const newCity = { ...city, id: uuidv4() };
    this.cities.push(newCity);
  }

  static async deleteCity(id: string): Promise<void> {
    this.cities = this.cities.filter(city => city.id !== id);
  }
} 