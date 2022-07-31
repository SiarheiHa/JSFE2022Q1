export interface QueryParam {
  page: number,
  limit: number,
}

export interface Car {
  name: string,
  color: string,
  id: number,
}

export interface CarsResponseObj {
  cars: Car[];
  count: number;
  page: number;
}

export interface InputObject {
  colorInput: HTMLInputElement;
  textInput: HTMLInputElement;
}

export interface GarageInputs {
  create: InputObject;
  update: InputObject;
}
