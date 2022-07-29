import { Car } from '../../interfaces';
import Api from '../api';

export default class Model {
  api: Api;

  cars: Car[] = [];

  carsCount: number = 0;

  constructor() {
    this.api = new Api();
  }

  async getGarageData() {
    return this.api.getCars();
    // this.cars = response.cars;
    // this.carsCount = response.count;
    // console.log(this.cars);
    // console.log(this.carsCount);
  }
}
