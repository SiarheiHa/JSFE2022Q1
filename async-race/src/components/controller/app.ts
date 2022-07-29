import Model from '../model/model';
import View from '../view/view';

export default class App {
  model: Model;

  view: View;

  constructor() {
    this.model = new Model();
    this.view = new View(this.eventHandler);
  }

  async start() {
    const garageData = await this.model.getGarageData();
    this.view.drawApp(garageData);
  }

  eventHandler(e: Event) {
    e.preventDefault();
    console.log(e.target);
  }
}
