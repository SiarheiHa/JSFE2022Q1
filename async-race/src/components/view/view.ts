import Header from './header/header';
import { GarageView } from './garage/garage';
import { CarsResponseObj } from '../../interfaces';

export default class View {
  header: Header;

  garage: GarageView;

  constructor(callback: (e: Event) => void) {
    this.header = new Header();
    this.garage = new GarageView(callback);
  }

  drawApp(data: CarsResponseObj) {
    this.header.drawHeader();
    this.garage.drawGarage(data);
  }
}
