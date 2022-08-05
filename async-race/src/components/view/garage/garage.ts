import {
  Car, CarsResponseObj, EnginData, GarageInputs,
} from '../../../interfaces';
import createNode from '../../utils/createNode';
import toggleClassActive from '../../utils/toggleClassActive';
import SVG from '../carSVG';

export const MAX_CARS_COUNT_PER_PAGE = 7;
const startCarEvent = new Event('startCar');

export class GarageView {
  callback: (e: Event) => void;

  container: HTMLElement | null = null;

  carsSection: HTMLElement | null = null;

  inputs: {} | GarageInputs = {};

  cars: Car[] = [];

  selectedCar: Car | undefined;

  pressedSelectButton: HTMLElement | null = null;

  page: number = 1;

  lastPage: number = 1;

  count: number = 0;

  carImages: HTMLElement[] = [];

  racers: { id: string; engineData: EnginData; }[] | undefined;

  constructor(callback: (e: Event) => void) {
    this.callback = callback;
  }

  updateGarage(data: CarsResponseObj) {
    const newSection = this.createCarsSection(data);
    this.carsSection?.replaceWith(newSection);
    this.carsSection = newSection;
    console.log(this.cars);
  }

  drawGarage(data: CarsResponseObj, container: HTMLElement) {
    const controlSection = this.createControlSection();
    this.carsSection = this.createCarsSection(data);
    container.append(controlSection, this.carsSection);
    this.container = container;
  }

  // Put control section in separateclass ?

  createControlSection() {
    const controlSection = createNode({ tag: 'section', classes: ['section', 'section__control'] });
    const createCarBlock = this.createInputBlock('create');
    const updateCarBlock = this.createInputBlock('update');
    const buttonsBlock = this.createButtonsBlock(['race', 'reset', 'generate cars']);

    controlSection.append(createCarBlock, updateCarBlock, buttonsBlock);
    return controlSection;
  }

  createInputBlock(inputBlockType: 'create' | 'update') {
    const form = createNode({ tag: 'form', classes: ['form'] });
    const textInput = createNode({ tag: 'input', classes: ['form__input-text'], atributesAdnValues: [['type', 'text']] });
    const colorInput = createNode({ tag: 'input', classes: ['form__input-color'], atributesAdnValues: [['type', 'color']] });
    const button = createNode({
      tag: 'button', classes: ['button', 'form__button'], atributesAdnValues: [['type', 'button'], ['data-button', inputBlockType]], inner: inputBlockType.toUpperCase(),
    });
    this.inputs = { ...this.inputs, ...{ [inputBlockType]: { textInput, colorInput } } };
    this.buttonsHandler(button);
    form.append(textInput, colorInput, button);
    return form;
  }

  createButtonsBlock(buttonsNames: string[], carID?: number) {
    const wrapper = createNode({ tag: 'div', classes: ['control__buttons'] });
    const buttons = buttonsNames.map((name: string) => createNode({
      tag: 'button',
      classes: ['button'],
      atributesAdnValues: [['data-button', `${name.split(' ')[0]}`]],
      inner: name.toUpperCase(),
    }));
    if (typeof carID === 'number') buttons.forEach((button) => button.setAttribute('data-car', String(carID)));
    buttons.forEach((button) => this.buttonsHandler(button));
    wrapper.append(...buttons);
    return wrapper;
  }

  // cars section

  createCarsSection(data: CarsResponseObj) {
    const { cars, count, page } = data;
    this.cars = cars.slice(0, MAX_CARS_COUNT_PER_PAGE);
    this.count = count;
    this.page = page;
    this.carImages = [];
    this.lastPage = Math.ceil(count / MAX_CARS_COUNT_PER_PAGE);
    const islastPage = Math.ceil(count / MAX_CARS_COUNT_PER_PAGE) <= page;
    const wrapper = createNode({ tag: 'section', classes: ['section', 'section__cars'] });
    const title = createNode({ tag: 'h1', inner: `Garage(${count})` });
    const subtitle = createNode({ tag: 'h2', inner: `Page#${this.page}` });
    const carItems = this.cars.map((car: Car) => this.createCar(car));
    // pagination
    const paginationButtons = this.createButtonsBlock(['prev', 'next']);
    if (page === 1) (paginationButtons.firstElementChild as HTMLButtonElement).disabled = true;
    if (islastPage) (paginationButtons.lastElementChild as HTMLButtonElement).disabled = true;
    wrapper.append(title, subtitle, ...carItems, paginationButtons);
    return wrapper;
  }

  createCar(car:Car) {
    const { name, color, id } = car;
    const wrapper = createNode({ tag: 'div', classes: ['car'], atributesAdnValues: [['data-car', `${id}`]] });
    const selectAndRemoveButtons = this.createButtonsBlock(['select', 'remove'], id);
    const carTitle = createNode({ tag: 'span', classes: ['car__title'], inner: name });
    const driveButtons = this.createButtonsBlock(['a', 'b'], id);
    (driveButtons.lastElementChild as HTMLButtonElement).disabled = true;
    const carImage = createNode({
      tag: 'div', classes: ['car__image'], inner: SVG.replace('color', color), atributesAdnValues: [['data-car', `${id}`]],
    });
    carImage.addEventListener('startCar', this.callback);
    this.carImages.push(carImage);

    wrapper.append(selectAndRemoveButtons, carTitle, driveButtons, carImage);
    return wrapper;
  }

  buttonsHandler(button: HTMLElement) {
    button.addEventListener('click', (e: Event) => {
      // eslint!!
      // button.dataset.button === 'select' ? this.setInputValue(button) : this.callback(e);
      if (button.dataset.button === 'select') {
        this.toggleSelectedCar(button);
      } else {
        this.callback(e);
        if (button.dataset.button === 'a' || button.dataset.button === 'b') {
          this.toggleDriveButtons(button as HTMLButtonElement);
        }
      }
    });
  }

  toggleDriveButtons(button: HTMLButtonElement) {
    // eslint!!!
    const pressedButton = button;
    if (button.dataset.button === 'a') {
      pressedButton.disabled = true;
      (pressedButton.nextElementSibling as HTMLButtonElement).disabled = false;
    } else {
      pressedButton.disabled = true;
      (pressedButton.previousElementSibling as HTMLButtonElement).disabled = false;
    }
  }

  toggleSelectedCar(button: HTMLElement) {
    const selectedCar = this.cars.find((car) => button.dataset.car === String(car.id));
    const inputsValues = { name: '', color: '#000000' };

    if (!(button.classList.contains('button_active'))) {
      inputsValues.color = String(selectedCar?.color);
      inputsValues.name = String(selectedCar?.name);
      this.selectedCar = selectedCar;
      toggleClassActive(this.pressedSelectButton);
      this.pressedSelectButton = button;
      toggleClassActive(button);
    } else {
      toggleClassActive(button);
      this.selectedCar = undefined;
      this.pressedSelectButton = null;
    }

    this.setInputsValue(inputsValues);
  }

  setInputsValue(inputsValues: { name: string, color: string }) {
    (this.inputs as GarageInputs).update.textInput.value = inputsValues.name;
    (this.inputs as GarageInputs).update.colorInput.value = inputsValues.color;
  }

  startCarAnimation(carID: string, engineData: EnginData) {
    // console.log(carID);
    const carImage = this.carImages.find(
      (image: HTMLElement) => image.dataset.car === carID,
    ) as HTMLElement;
    // console.log(carImage);
    const time = engineData.distance / engineData.velocity;
    const carAnimation = carImage.animate(
      [{ left: '0px' }, { left: 'calc(100% - 100px)' }],
      { id: carID, duration: time },
    );
    carImage.dispatchEvent(startCarEvent);
    carAnimation.play();
    carAnimation.addEventListener('finish', () => {
      carImage.style.left = 'calc(100% - 100px)';
      carAnimation.cancel();
    });
  }

  pauseCarAnimation(target: HTMLElement) {
    const animation = target.getAnimations()[0];
    if (animation) animation.pause();
  }

  stopCarAnimation(carID: string, stopButton: HTMLButtonElement) {
    const carImage = this.carImages.find((image) => image.dataset.car === carID) as HTMLElement;
    const animation = carImage.getAnimations()[0];
    // eslint!!!
    // animation ? animation.cancel() : carImage.style.left = '0px';
    if (animation) {
      animation.cancel();
    } else {
      carImage.style.left = '0px';
    }
    this.toggleDriveButtons(stopButton);
  }

  startRaceAnimation(racers: { id: string; engineData: EnginData; }[]) {
    this.racers = racers;
    racers.forEach((racer) => {
      this.startCarAnimation(racer.id, racer.engineData);
    });
    setTimeout(() => {
      console.log(this.racers);
    }, 3000);
    // console.log(racers);
  }
}
