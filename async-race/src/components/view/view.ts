import Header from './header/header';
import { GarageView } from './garage/garage';
import { CarsResponseObj, WinnersResponseObj } from '../../interfaces';
import createNode from '../utils/createNode';
import Winners from './winners/winners';

export default class View {
  header: Header;

  garage: GarageView;

  winners: Winners;

  constructor(callback: (e: Event) => void) {
    this.header = new Header();
    this.garage = new GarageView(callback);
    this.winners = new Winners(callback);
  }

  drawApp(garageData: CarsResponseObj, winnersData: WinnersResponseObj) {
    this.header.drawHeader();
    const main = createNode({ tag: 'main', classes: ['main'] });
    const wrapper = createNode({ tag: 'div', classes: ['main-wrapper', 'wrapper'] });
    const garageContainer = createNode({ tag: 'div', classes: ['garage-container'] });
    const winnersContainer = createNode({ tag: 'div', classes: ['winners-container'] });
    this.garage.drawGarage(garageData, garageContainer);
    this.winners.drawWinners(winnersData, winnersContainer);
    wrapper.append(winnersContainer, garageContainer);
    main.append(wrapper);
    document.body.append(main);
  }
}
