import {
  Car, NewWinner, QueryParam, Winner, WinnersData, WinnersQueryParam,
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
    const carsArr: Car[] = (await this.getGarageData()).cars;

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

  async updateWinners(winner: NewWinner) {
    const response = await this.api.getWinner(String(winner.id));
    // const response = await this.api.getWinner(String('10'));
    console.log(response);
    if (response.status === 404) {
      await this.api.createWinner({
        id: winner.id,
        wins: 1,
        time: Number(winner.time),
      });
    } else if (response.status === 200) {
      const data: Pick<Winner, 'id' | 'wins' | 'time'> = await response.json();
      console.log(data);
      await this.api.updateWinner(String(winner.id), {
        wins: data.wins + 1,
        time: Number(winner.time) < data.time ? Number(winner.time) : data.time,
      });
    }
  }

  deleteWinner(id: string) {
    return this.api.deleteWinner(id);
  }

  startEngine(carID: string) {
    return this.api.startEngine({ id: carID, status: 'started' });
  }

  stopEngine(carID: string) {
    return this.api.stopEngine({ id: carID, status: 'stopped' });
  }

  drive(carID: string) {
    return this.api.drive({ id: carID, status: 'drive' });
  }

  async startRace(carsArray: Car[]) {
    const carsID = carsArray.map((car) => String(car.id));
    const responses = carsID.map(async (id) => ({
      id,
      engineData: await (await this.startEngine(id)).json(),
    }));
    return responses;
  }
}
