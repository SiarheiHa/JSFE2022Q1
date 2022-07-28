import Header from './header/header';

export default class View {
  header: Header;

  constructor() {
    this.header = new Header();
  }

  drawApp() {
    this.header.drawHeader();
  }
}
