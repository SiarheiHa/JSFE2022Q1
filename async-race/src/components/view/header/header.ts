import createNode from '../../utils/createNode';

export default class Header {
  drawHeader() {
    console.log('drawHeader');
    const header = createNode({ tag: 'header', classes: ['header'] });
    const wrapper = createNode({ tag: 'div', classes: ['header-wrapper', 'wrapper'] });
    const buttons = ['to garage', 'to winners'].map((value) => {
      const button = createNode({ tag: 'button', classes: ['button', 'header__button'], inner: value }) as HTMLButtonElement;
      button.value = value.slice(3);
      return button;
    });
    wrapper.append(...buttons);
    header.append(wrapper);

    document.body.prepend(header);
  }
}
