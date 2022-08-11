import Header from './header/header';
import { GarageView } from './garage/garage';
import {
  CarsResponseObj, NewWinner, Page, WinnersData,
} from '../../interfaces';
import createNode from '../utils/createNode';
import Winners from './winners/winners';

export default class View {
  private header: Header;

  public garage: GarageView;

  public winners: Winners;

  private garageContainer: HTMLElement | undefined;

  private winnersContainer: HTMLElement | undefined;

  constructor(callback: (e: Event) => void, updateWinnersCallback: (winner: NewWinner) => void) {
    this.header = new Header(this.togglePage.bind(this));
    this.garage = new GarageView(callback, updateWinnersCallback);
    this.winners = new Winners(callback);
  }

  public drawApp(garageData: CarsResponseObj, winnersData: WinnersData) {
    this.header.drawHeader();
    const main = createNode({ tag: 'main', classes: ['main'] });
    const wrapper = createNode({ tag: 'div', classes: ['main-wrapper', 'wrapper'] });
    this.garageContainer = createNode({ tag: 'div', classes: ['garage-container'] });
    this.winnersContainer = createNode({ tag: 'div', classes: ['winners-container'] });
    this.winnersContainer.style.display = 'none';
    this.garage.drawGarage(garageData, this.garageContainer);
    this.winners.drawWinners(winnersData, this.winnersContainer);
    wrapper.append(this.winnersContainer, this.garageContainer);
    main.append(wrapper);
    document.body.append(main);
  }

  private togglePage(pageName: Page) {
    if (pageName === Page.garage) {
      (this.winnersContainer as HTMLElement).style.display = 'none';
      (this.garageContainer as HTMLElement).style.display = 'block';
    } else {
      (this.garageContainer as HTMLElement).style.display = 'none';
      (this.winnersContainer as HTMLElement).style.display = 'block';
    }
  }
}
