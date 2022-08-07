import { Winner, WinnersData } from '../../../interfaces';
import createNode from '../../utils/createNode';
import carSVG from '../carSVG';

export const MAX_WINNERS_COUNT_PER_PAGE = 7;

export default class Winners {
  callback: (e: Event) => void;

  page: number = 1;

  lastPage: number = 1;

  container: HTMLElement | null = null;

  count: number = 0;

  winners: Winner[] = [];

  constructor(callback: (e: Event) => void) {
    this.callback = callback;
  }

  drawWinners(data: WinnersData, container: HTMLElement) {
    this.container = container;

    const { count, page, winners } = data;
    this.winners = winners.slice(0, MAX_WINNERS_COUNT_PER_PAGE);
    this.page = page;
    this.count = count;
    this.lastPage = Math.ceil(count / MAX_WINNERS_COUNT_PER_PAGE);
    const islastPage = Math.ceil(count / MAX_WINNERS_COUNT_PER_PAGE) <= page;

    const title = createNode({ tag: 'h2', inner: `Winners(${this.count})` });
    const subtitle = createNode({ tag: 'h2', inner: `Page#${this.page}` });

    const table = createNode({ tag: 'table', classes: ['table'] });

    const thead = createNode({ tag: 'thead', classes: ['thead'] });
    const headRow = this.createTableRow('th', ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)']);
    thead.append(headRow);

    const tbody = createNode({ tag: 'tbody', classes: ['tbody'] });
    const bodyRows = this.winners.map((winner, index) => this.createTableRow('td', [String(MAX_WINNERS_COUNT_PER_PAGE * this.page - MAX_WINNERS_COUNT_PER_PAGE + index + 1), carSVG.replace('color', winner.color), winner.name, String(winner.wins), String(winner.time)]));
    tbody.append(...bodyRows);

    table.append(thead, tbody);

    const paginationButtons = this.createButtonsBlock(['prev', 'next']);
    if (page === 1) (paginationButtons.firstElementChild as HTMLButtonElement).disabled = true;
    if (islastPage) (paginationButtons.lastElementChild as HTMLButtonElement).disabled = true;

    container.append(title, subtitle, table, paginationButtons);
  }

  updateWinners(winnersData: WinnersData) {
    if (this.container) {
      console.log(winnersData);
      console.log('view update winners');
      this.container.innerHTML = '';
      this.drawWinners(winnersData, this.container);
    }
  }

  createButtonsBlock(buttonsNames: string[]) {
    const wrapper = createNode({ tag: 'div', classes: ['control__buttons'] });
    const buttons = buttonsNames.map((name: string) => createNode({
      tag: 'button',
      classes: ['button'],
      atributesAdnValues: [['data-button', `${name.split(' ')[0]}`]],
      inner: name.toUpperCase(),
    }));
    buttons.forEach((button) => this.buttonsHandler(button));
    wrapper.append(...buttons);
    return wrapper;
  }

  createTableRow(cellTag: 'th' | 'td', cellValues: string[]) {
    const row = createNode({ tag: 'tr' });
    const cells = cellValues.map((value) => createNode({ tag: cellTag, inner: value }));
    row.append(...cells);
    return row;
  }

  buttonsHandler(button: HTMLElement) {
    button.addEventListener('click', this.callback);
  }
}
