import { Page } from '../../../interfaces';
import createNode from '../../utils/createNode';

export default class SwitchField {
  callback: (page: Page) => void;

  textes: string[];

  name: string;

  values: string[];

  constructor(callback: (page: Page) => void, name: string, values: string[], textes: string[]) {
    this.callback = callback;
    this.name = name;
    this.values = values;
    this.textes = textes;
  }

  createSwitcField() {
    const div = createNode({ tag: 'div', classes: ['switch-field'] });
    const inputs = ['switch_left', 'switch_right']
      .map((id: string, index: number) => createNode({
        tag: 'input',
        atributesAdnValues: [
          ['type', 'radio'],
          ['id', id],
          ['name', this.name],
          ['value', this.values[index]],
        ],
      }));
    (inputs[0] as HTMLInputElement).checked = true;
    const labels = inputs.map((input: HTMLElement, index: number) => createNode({
      tag: 'label',
      atributesAdnValues: [
        ['for', input.id],
      ],
      inner: this.textes[index],
    }));
    inputs.forEach((input) => this.inputHandler(input as HTMLInputElement));
    inputs.forEach((input, index) => div.append(input, labels[index]));
    return div;
  }

  inputHandler(input: HTMLInputElement) {
    input.addEventListener('change', (e) => {
      const target = <HTMLInputElement>e.target;
      this.callback(target.value as Page);
    });
  }
}
