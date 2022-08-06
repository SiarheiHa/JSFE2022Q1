import {
  EnginData, GarageInputs, NewWinner, QueryParam,
} from '../../interfaces';
import Model from '../model/model';
import View from '../view/view';
import { MAX_CARS_COUNT_PER_PAGE } from '../view/garage/garage';

const COUNT_OF_RANDOM_CARS = 100;

export default class App {
  model: Model;

  view: View;

  constructor() {
    this.model = new Model();
    this.view = new View(this.garageEventHandler.bind(this), this.updateWinners.bind(this));
  }

  async start() {
    const garageData = await this.model.getGarageData();
    const winnersData = await this.model.getWinnersData();
    this.view.drawApp(garageData, winnersData);
  }

  async garageEventHandler(e: Event) {
    const target = <HTMLElement> e.target;
    const buttonRole = target.dataset.button;
    const nextPage = this.view.garage.count % MAX_CARS_COUNT_PER_PAGE === 0
      ? this.view.garage.lastPage + 1 : this.view.garage.lastPage;
    const prevPage = this.view.garage.cars.length === 1
      ? this.view.garage.page - 1 : this.view.garage.page;
    if (buttonRole === 'a' || buttonRole === 'b' || buttonRole === 'race' || buttonRole === 'reset' || e.type === 'startCar') {
      this.animationHandler(e);
      return;
    }
    if (buttonRole === 'create' || buttonRole === 'update') {
      const name = (this.view.garage.inputs as GarageInputs)[buttonRole].textInput.value;
      const color = (this.view.garage.inputs as GarageInputs)[buttonRole].colorInput.value;
      if (buttonRole === 'create') {
        const response = await this.model.createCar({ name, color });
        if (response.ok) {
          this.updateView({ page: nextPage, limit: MAX_CARS_COUNT_PER_PAGE });
        }
      } else if (this.view.garage.selectedCar?.id) {
        const id = String(this.view.garage.selectedCar.id);
        const response = await this.model.updateCar(id, { name, color });
        if (response.ok) {
          this.updateView({ page: this.view.garage.page, limit: MAX_CARS_COUNT_PER_PAGE });
        }
      }
    }
    if (buttonRole === 'remove') {
      const carID = <string>target.dataset.car;
      const response = await this.model.deleteCar(carID);
      await this.model.deleteWinner(carID);
      if (response.ok) {
        this.updateWinnersView();
        this.updateView({ page: prevPage, limit: MAX_CARS_COUNT_PER_PAGE });
      }
    }

    if (buttonRole === 'next') this.updateView({ page: this.view.garage.page + 1, limit: MAX_CARS_COUNT_PER_PAGE });
    if (buttonRole === 'prev') this.updateView({ page: this.view.garage.page - 1, limit: MAX_CARS_COUNT_PER_PAGE });
    if (buttonRole === 'generate') {
      const responses = await this.model.generateRandomCars(COUNT_OF_RANDOM_CARS);
      if (responses.every((response) => response.ok)) this.updateView();
    }
  }

  async updateView(queryParam?: QueryParam) {
    const garageData = await this.model.getGarageData(queryParam);
    this.view.garage.updateGarage(garageData);
  }

  async updateWinners(winner: NewWinner) {
    await this.model.updateWinners(winner);
    this.updateWinnersView();
  }

  async updateWinnersView() {
    const winnersData = await this.model.getWinnersData();
    this.view.winners.updateWinners(winnersData);
  }

  async animationHandler(e: Event) {
    // console.log(e.type);
    const target = <HTMLElement> e.target;
    const buttonRole = target.dataset.button;
    const carID = target.dataset.car as string;
    if (buttonRole === 'a') {
      const response = await this.model.startEngine(carID);
      if (response.ok) {
        const engineData: EnginData = await response.json();
        this.view.garage.startCarAnimation(carID, engineData);
      }
    }
    if (buttonRole === 'b') {
      const response = await this.model.stopEngine(carID);
      if (response.ok) {
        this.view.garage.stopCarAnimation(carID, target as HTMLButtonElement);
      }
    }
    if (buttonRole === 'reset') {
      this.view.garage.isResetPressed = true;
      const carsID = this.view.garage.cars.map((car) => String(car.id));
      carsID.forEach(async (id) => {
        this.model.stopEngine(id);
      });
      this.view.garage.stopCarAnimation(carID, target as HTMLButtonElement);
    }
    if (buttonRole === 'race') {
      this.view.garage.isResetPressed = false;
      const promiseArr = await this.model.startRace(this.view.garage.cars);
      const racers = await Promise.all(promiseArr);
      this.view.garage.startRaceAnimation(racers);
      // this.racers = racers;
      // racers.forEach((racer) => {
      //   this.view.garage.startCarAnimation(racer.id, racer.engineData);
      // });
      // console.log(this.racers);
      // for (let i = 0; i < racers.length; i += 1) {
      //   const racer = racers[i];
      //   console.log(racer.id);
      //   console.log(racer.engineData);
      // }

      // it works
      // responses.forEach(async (item) => {
      //   const { id } = item;
      //   const engineData = await (await item.engineData).json();
      //   console.log(id, engineData);
      //   this.view.garage.startCarAnimation(id, engineData);
      // });
    }
    if (e.type === 'startCar') {
      // console.log('poehali');
      const response = await this.model.drive(carID);
      console.log(response.status);
      if (response.status === 500) this.view.garage.pauseCarAnimation(target);
      // race
      if (response.status === 500 && this.view.garage.racers) {
        this.view.garage.racers = this.view.garage.racers.filter((racer) => racer.id !== carID);
      }
    }
  }
}
