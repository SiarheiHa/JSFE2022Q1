import { Car } from '../../interfaces';
import Api from '../api';
import View from '../view/view';

export default class App {
  api: Api;

  view: View;

  cars: Car[];

  carsCount: number;

  constructor() {
    this.api = new Api();
    this.view = new View();
    this.cars = [];
    this.carsCount = 0;
  }

  async start() {
    const response = await this.api.getCars();
    this.cars = response.cars;
    this.carsCount = response.count;
    this.view.drawApp();
  }
}
