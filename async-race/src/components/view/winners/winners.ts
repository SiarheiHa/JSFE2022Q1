import { WinnersData } from '../../../interfaces';
import createNode from '../../utils/createNode';
import carSVG from '../carSVG';

export default class Winners {
  callback: (e: Event) => void;

  page: number = 1;

  container: HTMLElement | null = null;

  constructor(callback: (e: Event) => void) {
    this.callback = callback;
  }

  drawWinners(data: WinnersData, container: HTMLElement) {
    // this.carsSection = this.createCarsSection(data);
    // container.append(controlSection, this.carsSection);
    this.container = container;
    console.log(data);
    console.log(container);

    const { count, page, winners } = data;
    this.page = page;

    const title = createNode({ tag: 'h2', inner: `Winners(${count})` });
    const subtitle = createNode({ tag: 'h2', inner: `Page#${this.page}` });

    const table = createNode({ tag: 'table', classes: ['table'] });

    const thead = createNode({ tag: 'thead', classes: ['thead'] });
    const headRow = this.createTableRow('th', ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)']);
    thead.append(headRow);

    const tbody = createNode({ tag: 'tbody', classes: ['tbody'] });
    const bodyRows = winners.map((winner, index) => this.createTableRow('td', [String(index + 1), carSVG.replace('color', winner.color), winner.name, String(winner.wins), String(winner.time)]));
    tbody.append(...bodyRows);

    table.append(thead, tbody);

    const paginationButtons = this.createButtonsBlock(['prev', 'next']);

    container.append(title, subtitle, table, paginationButtons);
  }

  createButtonsBlock(buttonsNames: string[]) {
    const wrapper = createNode({ tag: 'div', classes: ['control__buttons'] });
    const buttons = buttonsNames.map((name: string) => createNode({
      tag: 'button',
      classes: ['button'],
      atributesAdnValues: [['data-button', `${name.split(' ')[0]}`]],
      inner: name.toUpperCase(),
    }));
    // buttons.forEach((button) => this.buttonsHandler(button));
    wrapper.append(...buttons);
    return wrapper;
  }

  createTableRow(cellTag: 'th' | 'td', cellValues: string[]) {
    const row = createNode({ tag: 'tr' });
    const cells = cellValues.map((value) => createNode({ tag: cellTag, inner: value }));
    row.append(...cells);
    return row;
  }
}
