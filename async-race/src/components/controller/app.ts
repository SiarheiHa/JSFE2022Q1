import Model from '../model/model';
import View from '../view/view';

export default class App {
  model: Model;

  view: View;

  constructor() {
    this.model = new Model();
    this.view = new View(this.eventHandler.bind(this));
  }

  async start() {
    const garageData = await this.model.getGarageData();
    this.view.drawApp(garageData);
  }

  async eventHandler(e: Event) {
    const target = <HTMLElement> e.target;
    if (target.dataset.button) {
      const buttonRole = target.dataset.button;
      if (buttonRole === 'create' || buttonRole === 'update') {
        const name = (target.previousSibling?.previousSibling as HTMLInputElement).value;
        const color = (target.previousSibling as HTMLInputElement).value;
        if (buttonRole === 'create') {
          const response = await this.model.createCar({ name, color });
          if (response.ok) this.updateView();
        }
      }

      if (buttonRole === 'remove') {
        const carID = <string>target.dataset.car;
        const response = await this.model.deleteCar(carID);
        if (response.ok) this.updateView();
      }
    }
  }

  async updateView() {
    const garageData = await this.model.getGarageData();
    this.view.garage.updateGarage(garageData);
  }
}
