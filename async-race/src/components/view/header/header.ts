import createNode from '../../utils/createNode';

export default class Header {
  drawHeader() {
    console.log('drawHeader');
    const header = createNode({ tag: 'header', classes: ['header'] });
    const wrapper = createNode({ tag: 'div', classes: ['header-wrapper', 'wrapper'] });
    header.append(wrapper);
    document.body.prepend(header);
  }
}
