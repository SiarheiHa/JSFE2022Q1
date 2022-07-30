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

  eventHandler(e: Event) {
    const { target } = e;
    if (target instanceof HTMLElement && target.dataset.button) {
      const buttonRole = target.dataset.button;
      if (buttonRole === 'create' || buttonRole === 'update') {
        console.log(buttonRole);
        const name = (target.previousSibling?.previousSibling as HTMLInputElement).value;
        const color = (target.previousSibling as HTMLInputElement).value;
        if (buttonRole === 'create') this.model.createCar({ name, color });
      }
      if (buttonRole === 'remove') {
        const carID = target.parentElement?.parentElement?.dataset.car;
        if (carID) this.model.deleteCar(carID);
      }
    }
  }
}
