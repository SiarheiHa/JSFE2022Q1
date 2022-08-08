import {
  Car,
  CarsResponseObj,
  EnginData, GarageInputs, NewWinner, QueryParam, WinnersData, WinnersQueryParam,
} from '../../interfaces';
import Model from '../model/model';
import View from '../view/view';
import { MAX_CARS_COUNT_PER_PAGE } from '../view/garage/garage';
import { MAX_WINNERS_COUNT_PER_PAGE } from '../view/winners/winners';

const COUNT_OF_RANDOM_CARS = 100;

export default class App {
  model: Model;

  view: View;

  constructor() {
    this.model = new Model();
    this.view = new View(this.eventHandler.bind(this), this.updateWinners.bind(this));
  }

  async start(): Promise<void> {
    const garageData: CarsResponseObj = await this.model.getGarageData();
    const winnersData: WinnersData = await this.model.getWinnersData();
    this.view.drawApp(garageData, winnersData);
  }

  async eventHandler(e: Event): Promise<void> {
    const target = <HTMLElement> e.target;
    if (target.closest('.winners-container')) this.winnersEventHandler(e);
    else this.garageEventHandler(e);
  }

  async garageEventHandler(e: Event) {
    const target = <HTMLElement> e.target;
    const buttonRole = target.dataset.button;
    if (buttonRole === 'a' || buttonRole === 'b' || buttonRole === 'race' || buttonRole === 'reset' || e.type === 'startCar') {
      this.animationHandler(e);
      return;
    }
    const nextPage: number = this.view.garage.count % MAX_CARS_COUNT_PER_PAGE === 0
      ? this.view.garage.lastPage + 1 : this.view.garage.lastPage;
    const prevPage: number = this.view.garage.cars.length === 1
      ? this.view.garage.page - 1 : this.view.garage.page;
    if (buttonRole === 'create' || buttonRole === 'update') {
      const name: string = (this.view.garage.inputs as GarageInputs)[buttonRole].textInput.value;
      const color: string = (this.view.garage.inputs as GarageInputs)[buttonRole].colorInput.value;
      if (buttonRole === 'create') {
        const response: Response = await this.model.createCar({ name, color });
        if (response.ok) this.updateView({ page: nextPage, limit: MAX_CARS_COUNT_PER_PAGE });
      } else if (this.view.garage.selectedCar?.id) {
        const id: string = String(this.view.garage.selectedCar.id);
        const response: Response = await this.model.updateCar(id, { name, color });
        if (response.ok) {
          this.updateView({ page: this.view.garage.page, limit: MAX_CARS_COUNT_PER_PAGE });
          this.updateWinnersView();
        }
      }
    } else if (buttonRole === 'remove') {
      const carID = <string>target.dataset.car;
      const response: Response = await this.model.deleteCar(carID);
      await this.model.deleteWinner(carID);
      if (response.ok) {
        this.updateWinnersView();
        this.updateView({ page: prevPage, limit: MAX_CARS_COUNT_PER_PAGE });
      }
    } else if (buttonRole === 'next') this.updateView({ page: this.view.garage.page + 1, limit: MAX_CARS_COUNT_PER_PAGE });
    else if (buttonRole === 'prev') this.updateView({ page: this.view.garage.page - 1, limit: MAX_CARS_COUNT_PER_PAGE });
    else if (buttonRole === 'generate') {
      const responses: Response[] = await this.model.generateRandomCars(COUNT_OF_RANDOM_CARS);
      if (responses.every((response) => response.ok)) this.updateView();
    }
  }

  winnersEventHandler(e: Event): void {
    const target = <HTMLElement> e.target;
    const buttonRole = target.dataset.button;
    const { sort, order } = this.view.winners;
    let { page } = this.view.winners;
    const limit = MAX_WINNERS_COUNT_PER_PAGE;

    if (buttonRole === 'next') page += 1;
    if (buttonRole === 'prev') page -= 1;

    this.updateWinnersView({
      page, limit, sort, order,
    });
  }

  async updateView(queryParam?: QueryParam) {
    const garageData = await this.model.getGarageData(queryParam);
    this.view.garage.updateGarage(garageData);
  }

  async updateWinners(winner: NewWinner) {
    await this.model.updateWinners(winner);
    this.updateWinnersView();
  }

  async updateWinnersView(queryParam: WinnersQueryParam = {
    sort: this.view.winners.sort,
    order: this.view.winners.order,
    page: this.view.winners.page,
    limit: MAX_WINNERS_COUNT_PER_PAGE,
  }) {
    const winnersData = await this.model.getWinnersData(queryParam);
    this.view.winners.updateWinners(winnersData);
  }

  async animationHandler(e: Event): Promise<void> {
    const target = <HTMLElement> e.target;
    const buttonRole = target.dataset.button;
    const carID = target.dataset.car as string;
    if (buttonRole === 'a') {
      const response = await this.model.startEngine(carID);
      if (response.ok) {
        const engineData: EnginData = await response.json();
        this.view.garage.startCarAnimation(carID, engineData);
        this.getRacersData({ id: carID });
      }
    } else if (buttonRole === 'b') {
      const response: Response = await this.model.stopEngine(carID);
      if (response.ok) {
        this.view.garage.stopCarAnimation(carID, target as HTMLButtonElement);
      }
    } else if (buttonRole === 'reset') {
      this.view.garage.isResetPressed = true;
      const carsID: string[] = this.view.garage.cars.map((car) => String(car.id));
      carsID.forEach(async (id) => this.model.stopEngine(id));
      this.view.garage.stopCarAnimation(carID, target as HTMLButtonElement);
    } else if (buttonRole === 'race') {
      this.view.garage.isResetPressed = false;
      const promiseArr = await this.model.startRace(this.view.garage.cars);
      const racers = await Promise.all(promiseArr);
      racers.sort((a, b) => (a.engineData.distance / a.engineData.velocity)
        - (b.engineData.distance / b.engineData.velocity));
      this.view.garage.startRaceAnimation(racers);
      const promises = racers.map((racer) => this.getRacersData(racer));
      for (let i = 0; i < promises.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const response = await promises[i];
        if (response.status === 200) {
          if (this.view.garage.isResetPressed) return;
          const { id } = racers[i];
          const time = (racers[i].engineData.distance / racers[i].engineData.velocity / 1000)
            .toFixed(2);
          const winnerCar = this.view.garage.cars.find((car) => String(car.id) === id) as Car;
          const winner = { ...winnerCar, time };
          this.updateWinners(winner);
          this.view.garage.modal.buildModal(`${winner.name} wont first (${winner.time}s)`);
          this.view.garage.isResetPressed = false;
          break;
        }
      }
    }
  }

  async getRacersData(racer: { id: string, engineData?: EnginData }) {
    const response = await this.model.drive(racer.id);
    if (response.status === 500) this.view.garage.pauseCarAnimation(racer.id);
    return response;
  }
}
