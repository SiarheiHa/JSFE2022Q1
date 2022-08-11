import {
  Car, EnginData, NewWinner, QueryParam, SortingOrder,
  SortingType, Winner, WinnersData, WinnersQueryParam,
} from '../../interfaces';
import Api from '../api';
import cars from '../constants/cars';
import getRandomFromArray from '../utils/getRandomFromArray';
import getRandomHEXColor from '../utils/getRandomHEXColor';

export default class Model {
  api: Api;

  constructor() {
    this.api = new Api();
  }

  public async getGarageData(queryParam?: QueryParam) {
    return this.api.getCars(queryParam);
  }

  public async createCar(car: Pick<Car, 'name' | 'color'>) {
    return this.api.createCar(car);
  }

  public updateCar(id: string, car: Pick<Car, 'name' | 'color'>) {
    return this.api.updateCar(id, car);
  }

  public async deleteCar(id: string) {
    return this.api.deleteCar(id);
  }

  public async generateRandomCars(COUNT_OF_RANDOM_CARDS: number) {
    let i = 0;
    const results = [];
    while (i < COUNT_OF_RANDOM_CARDS) {
      const car = this.getRandomCar();
      results.push(this.createCar(car));
      i += 1;
    }
    return Promise.all(results);
  }

  private getRandomCar() {
    return {
      name: this.getRandomCarName(),
      color: getRandomHEXColor(),
    };
  }

  private getRandomCarName() {
    const randomCarManufacturer = getRandomFromArray(cars);
    const model = getRandomFromArray(randomCarManufacturer.models);
    return `${randomCarManufacturer.brand} ${model}`;
  }

  public async getWinnersData(queryParam?: WinnersQueryParam): Promise<WinnersData> {
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
    return {
      winners,
      count: count ? Number(count) : winners.length,
      page: queryParam?.page ? queryParam.page : 1,
      sort: queryParam?.sort ? queryParam.sort : SortingType.id,
      order: queryParam?.order ? queryParam.order : SortingOrder.asc,
    };
  }

  public async updateWinners(winner: NewWinner) {
    const response = await this.api.getWinner(String(winner.id));
    if (response.status === 404) {
      await this.api.createWinner({
        id: winner.id,
        wins: 1,
        time: Number(winner.time),
      });
    } else if (response.status === 200) {
      const data: Pick<Winner, 'id' | 'wins' | 'time'> = await response.json();
      await this.api.updateWinner(String(winner.id), {
        wins: data.wins + 1,
        time: Number(winner.time) < data.time ? Number(winner.time) : data.time,
      });
    }
  }

  public deleteWinner(id: string) {
    return this.api.deleteWinner(id);
  }

  public startEngine(carID: string) {
    return this.api.startEngine({ id: carID, status: 'started' });
  }

  public stopEngine(carID: string) {
    return this.api.stopEngine({ id: carID, status: 'stopped' });
  }

  public drive(carID: string) {
    return this.api.drive({ id: carID, status: 'drive' });
  }

  public async startRace(carsArray: Car[]) {
    const carsID = carsArray.map((car) => String(car.id));
    const responses:
    Promise<{
      id: string;
      engineData: EnginData;
    }>[] = carsID.map(async (id) => ({
      id,
      engineData: await (await this.startEngine(id)).json(),
    }));
    return responses;
  }
}
