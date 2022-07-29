import createNode from '../../utils/createNode';
import SwitchField from '../switchField/switchfield';

export default class Header {
  switchField: SwitchField = new SwitchField('header-radio', ['garage', 'winners'], ['to garage', 'to winners']);

  drawHeader() {
    const header = createNode({ tag: 'header', classes: ['header'] });
    const wrapper = createNode({ tag: 'div', classes: ['header-wrapper', 'wrapper'] });
    wrapper.append(this.switchField.createSwitcField());
    header.append(wrapper);

    document.body.prepend(header);
  }
}
