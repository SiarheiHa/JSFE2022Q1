import Model from '../model/model';
import View from '../view/view';

export default class App {
  model: Model;

  view: View;

  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  start() {
    this.model.getGarageData();
    this.view.drawApp();
  }
}
