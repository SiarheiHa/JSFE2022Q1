import { WinnersResponseObj } from '../../../interfaces';

export default class Winners {
  callback: (e: Event) => void;

  container: HTMLElement | null = null;

  constructor(callback: (e: Event) => void) {
    this.callback = callback;
  }

  drawWinners(data: WinnersResponseObj, container: HTMLElement) {
    // this.carsSection = this.createCarsSection(data);
    // container.append(controlSection, this.carsSection);
    this.container = container;
  }
}
