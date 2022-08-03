export interface QueryParam {
  page: number,
  limit: number,
}

export interface WinnersQueryParam {
  page: number,
  limit: number,
  sort: 'id' | 'wins' | 'time',
  order:'ASC' | 'DESC',
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

export interface Winner extends Car {
  id: number,
  wins: number,
  time: number;
}

export interface WinnersResponseObj {
  winners: Winner[];
}

export interface WinnersData extends WinnersResponseObj {
  count: Number;
  page: Number;
  sort: 'id' | 'wins' | 'time';
  order: 'ASC' | 'DESC',
}

export interface InputObject {
  colorInput: HTMLInputElement;
  textInput: HTMLInputElement;
}

export interface GarageInputs {
  create: InputObject;
  update: InputObject;
}
