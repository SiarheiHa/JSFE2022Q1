import {
  Car, CarsResponseObj, Endpoint, EngineQueryParam, QueryParam, Winner, WinnersQueryParam,
} from '../interfaces';

const BASE_LINK = 'http://127.0.0.1:3000';

const generateQueryString = (queryParam?: object): string => {
  if (!queryParam) return '';
  const paramString = Object.keys(queryParam)
    .map((key: string) => `_${key}=${queryParam[key as keyof object]}`)
    .join('&');
  return `?${paramString}`;
};

const makeUrl = (
  base: string,
  endpoint: Endpoint,
  queryParam?: QueryParam | EngineQueryParam,
): URL => {
  const url = new URL(`${endpoint}${generateQueryString(queryParam)}`, base);
  return url;
};

export default class Api {
  async getCars(queryParam?: QueryParam): Promise<CarsResponseObj> {
    const response: Response = await fetch(makeUrl(BASE_LINK, Endpoint.garage, queryParam));
    if (!response.ok) {
      throw new Error('server is not available');
    }
    const count: string | null = response.headers.get('X-Total-Count');
    const cars: Car[] = await response.json();
    return {
      cars,
      count: count ? Number(count) : cars.length,
      page: queryParam?.page ? queryParam.page : 1,
    };
  }

  createCar(car: Pick<Car, 'name' | 'color'>): Promise<Response> {
    return fetch(makeUrl(BASE_LINK, Endpoint.garage), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  deleteCar(id: string): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.garage)}/${id}`, {
      method: 'DELETE',
    });
  }

  updateCar(id: string, car: Pick<Car, 'name' | 'color'>): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.garage)}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  getWinners(queryParam?: WinnersQueryParam): Promise<Response> {
    return fetch(makeUrl(BASE_LINK, Endpoint.winners, queryParam));
  }

  getWinner(id: string): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.winners)}/${id}`);
  }

  createWinner(winner: Pick<Winner, 'id' | 'wins' | 'time'>): Promise<Response> {
    return fetch(makeUrl(BASE_LINK, Endpoint.winners), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  updateWinner(id: string, winner: Pick<Winner, 'wins' | 'time'>): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.winners)}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  deleteWinner(id: string): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.winners)}/${id}`, {
      method: 'DELETE',
    });
  }

  getCar(id: string): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.garage)}/${id}`);
  }

  startEngine(queryParam: EngineQueryParam): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.engine)}?id=${queryParam.id}&status=${queryParam.status}`, {
      method: 'PATCH',
    });
  }

  stopEngine(queryParam: EngineQueryParam): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.engine)}?id=${queryParam.id}&status=${queryParam.status}`, {
      method: 'PATCH',
    });
  }

  drive(queryParam: EngineQueryParam): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.engine)}?id=${queryParam.id}&status=${queryParam.status}`, {
      method: 'PATCH',
    });
  }
}
