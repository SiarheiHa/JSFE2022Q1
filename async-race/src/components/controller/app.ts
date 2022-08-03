import { GarageInputs, QueryParam } from '../../interfaces';
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
  }

  async updateView(queryParam?: QueryParam) {
    const garageData = await this.model.getGarageData(queryParam);
    this.view.garage.updateGarage(garageData);
  }
}
