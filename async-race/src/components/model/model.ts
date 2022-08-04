import {
  Car, QueryParam, Winner, WinnersData, WinnersQueryParam,
} from '../../interfaces';
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

  async getWinnersData(queryParam?: WinnersQueryParam): Promise<WinnersData> {
    const response = await this.api.getWinners(queryParam);
    if (!response.ok) {
      throw new Error('server is not available');
    }
    const count = response.headers.get('X-Total-Count');
    const winners: Winner[] = await response.json();
    const carsArr: Car[] = await (await this.getGarageData()).cars;

    for (let i = 0; i < winners.length; i += 1) {
      const winner = winners[i];
      const winnersCar = carsArr.find((car) => car.id === winner.id);
      winner.name = String(winnersCar?.name);
      winner.color = String(winnersCar?.color);
    }

    // как обойти линт ?
    // winners.forEach((winner) => {
    //   winner.color = 'black';
    // });
    return {
      winners,
      count: count ? Number(count) : winners.length,
      page: queryParam?.page ? queryParam.page : 1,
      sort: queryParam?.sort ? queryParam.sort : 'id',
      order: queryParam?.order ? queryParam.order : 'ASC',
    };
  }

  startEngine(carID: string) {
    return this.api.startEngine({ id: carID, status: 'started' });
  }

  drive(carID: string) {
    return this.api.drive({ id: carID, status: 'drive' });
  }
}
