export const addClassActive = (node: HTMLElement): void => {
    if (node.parentElement) {
        [...node.parentElement.children].forEach((el) => el.classList.remove('active'));
    }
    node.classList.add('active');
};
