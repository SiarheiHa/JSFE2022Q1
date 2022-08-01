import { Car, QueryParam } from '../../interfaces';
import Api from '../api';
import cars from '../constants/cars';
import getRandomFromArray from '../utils/getRandomFromArray';
import getRandomHEXColor from '../utils/getRandomHEXColor';

export default class Model {
  api: Api;

  // cars: Car[] = [];

  // carsCount: number = 0;

  constructor() {
    this.api = new Api();
  }

  async getGarageData(queryParam?: QueryParam) {
    return this.api.getCars(queryParam);
  }

  async createCar(car: Pick<Car, 'name' | 'color'>) {
    return this.api.createCar(car);
  }

  updateCar(id: string, car: Pick<Car, 'name' | 'color'>) {
    return this.api.updateCar(id, car);
  }

  async deleteCar(id: string) {
    return this.api.deleteCar(id);
  }

  async generateRandomCars(COUNT_OF_RANDOM_CARDS: number) {
    let i = 0;
    const results = [];
    while (i < COUNT_OF_RANDOM_CARDS) {
      const car = this.getRandomCar();
      results.push(this.createCar(car));
      i += 1;
    }
    return Promise.all(results);
  }

  getRandomCar() {
    return {
      name: this.getRandomCarName(),
      color: getRandomHEXColor(),
    };
  }

  getRandomCarName() {
    const randomCarManufacturer = getRandomFromArray(cars);
    const model = getRandomFromArray(randomCarManufacturer.models);
    return `${randomCarManufacturer.brand} ${model}`;
  }
}
