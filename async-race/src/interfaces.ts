export interface QueryParam {
  _page: number,
  _limit: number,
}

export interface Car {
  name: string,
  color: string,
  id: number,
}

export interface CarsResponseObj {
  cars: Car[];
  count: number;
}
