import Header from './header/header';
import { GarageView } from './garage/garage';
import { CarsResponseObj } from '../../interfaces';
import createNode from '../utils/createNode';

export default class View {
  header: Header;

  garage: GarageView;

  constructor(callback: (e: Event) => void) {
    this.header = new Header();
    this.garage = new GarageView(callback);
  }

  drawApp(data: CarsResponseObj) {
    this.header.drawHeader();
    const main = createNode({ tag: 'main', classes: ['main'] });
    const wrapper = createNode({ tag: 'div', classes: ['main-wrapper', 'wrapper'] });
    const garageContainer = createNode({ tag: 'div', classes: ['garage-container'] });
    this.garage.drawGarage(data, garageContainer);
    wrapper.append(garageContainer);
    main.append(wrapper);
    document.body.append(main);
  }
}
