export default (target: HTMLElement | null): void => {
  if (target instanceof HTMLElement) {
    target.classList.toggle(`${target.classList[0]}_active`);
  }
};
