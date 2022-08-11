import { Page } from '../../../interfaces';
import createNode from '../../utils/createNode';
import SwitchField from '../switchField/switchfield';

export default class Header {
  private switchField: SwitchField;

  constructor(callback: (page: Page) => void) {
    this.switchField = new SwitchField(callback, 'header-radio', ['garage', 'winners'], ['to garage', 'to winners']);
  }

  public drawHeader() {
    const header = createNode({ tag: 'header', classes: ['header'] });
    const wrapper = createNode({ tag: 'div', classes: ['header-wrapper', 'wrapper'] });
    wrapper.append(this.switchField.createSwitcField());
    header.append(wrapper);

    document.body.prepend(header);
  }
}
