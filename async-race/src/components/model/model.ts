import { Car } from '../../interfaces';
import Api from '../api';

export default class Model {
  api: Api;

  // cars: Car[] = [];

  // carsCount: number = 0;

  constructor() {
    this.api = new Api();
  }

  async getGarageData() {
    return this.api.getCars();
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
}
