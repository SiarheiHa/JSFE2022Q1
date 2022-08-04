import { EnginData, GarageInputs, QueryParam } from '../../interfaces';
import Model from '../model/model';
import View from '../view/view';
import { MAX_CARS_COUNT_PER_PAGE } from '../view/garage/garage';

const COUNT_OF_RANDOM_CARS = 100;

export default class App {
  model: Model;

  view: View;

  constructor() {
    this.model = new Model();
    this.view = new View(this.eventHandler.bind(this));
  }

  async start() {
    const garageData = await this.model.getGarageData();
    const winnersData = await this.model.getWinnersData();
    this.view.drawApp(garageData, winnersData);
  }

  async eventHandler(e: Event) {
    const target = <HTMLElement> e.target;
    const buttonRole = target.dataset.button;
    const nextPage = this.view.garage.count % MAX_CARS_COUNT_PER_PAGE === 0
      ? this.view.garage.lastPage + 1 : this.view.garage.lastPage;
    const prevPage = this.view.garage.cars.length === 1
      ? this.view.garage.page - 1 : this.view.garage.page;
    if (buttonRole === 'a' || buttonRole === 'b' || buttonRole === 'race' || e.type === 'startCar') {
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
      if (response.ok) {
        this.updateView({ page: prevPage, limit: MAX_CARS_COUNT_PER_PAGE });
      }
    }

    if (buttonRole === 'next') this.updateView({ page: this.view.garage.page + 1, limit: MAX_CARS_COUNT_PER_PAGE });
    if (buttonRole === 'prev') this.updateView({ page: this.view.garage.page - 1, limit: MAX_CARS_COUNT_PER_PAGE });
    if (buttonRole === 'generate') {
      const responses = await this.model.generateRandomCars(COUNT_OF_RANDOM_CARS);
      if (responses.every((response) => response.ok)) this.updateView();
    }
    console.log(e);
  }

  async updateView(queryParam?: QueryParam) {
    const garageData = await this.model.getGarageData(queryParam);
    this.view.garage.updateGarage(garageData);
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
      console.log('stop');
      const response = await this.model.stopEngine(carID);
      if (response.ok) {
        this.view.garage.stopCarAnimation(carID, target as HTMLButtonElement);
      }
    }
    if (buttonRole === 'race') {
      console.log('race');
      const promises = this.model.startRace(this.view.garage.cars);
      const responses = Promise.all(promises);
      // console.log(await responses);
      (await responses).forEach(async (item) => {
        const { id } = item;
        const engineData = await (await item.engineData).json();
        // console.log(id, engineData);
        this.view.garage.startCarAnimation(id, engineData);
      });
      // promises.forEach(async (promise) => {
      //   console.log(promise);
      //   const response = await promise;
      //   console.log(response.id);
      //   // if (response.ok) {
      //   //   const engineData: EnginData = await response.json();
      //   //   console.log(engineData);
      //   // }
      // });
      // if (response.ok) {
      //   this.view.garage.stopCarAnimation(carID, target as HTMLButtonElement);
      // }
    }
    if (e.type === 'startCar') {
      console.log('poehali');
      const response = await this.model.drive(carID);
      console.log(response.status);
      if (response.status === 500) this.view.garage.pauseCarAnimation(target);
    }
  }
}
