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
  public async getCars(queryParam?: QueryParam): Promise<CarsResponseObj> {
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

  public createCar(car: Pick<Car, 'name' | 'color'>): Promise<Response> {
    return fetch(makeUrl(BASE_LINK, Endpoint.garage), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  public deleteCar(id: string): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.garage)}/${id}`, {
      method: 'DELETE',
    });
  }

  public updateCar(id: string, car: Pick<Car, 'name' | 'color'>): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.garage)}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  public getWinners(queryParam?: WinnersQueryParam): Promise<Response> {
    return fetch(makeUrl(BASE_LINK, Endpoint.winners, queryParam));
  }

  public getWinner(id: string): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.winners)}/${id}`);
  }

  public createWinner(winner: Pick<Winner, 'id' | 'wins' | 'time'>): Promise<Response> {
    return fetch(makeUrl(BASE_LINK, Endpoint.winners), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  public updateWinner(id: string, winner: Pick<Winner, 'wins' | 'time'>): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.winners)}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  public deleteWinner(id: string): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.winners)}/${id}`, {
      method: 'DELETE',
    });
  }

  public getCar(id: string): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.garage)}/${id}`);
  }

  public startEngine(queryParam: EngineQueryParam): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.engine)}?id=${queryParam.id}&status=${queryParam.status}`, {
      method: 'PATCH',
    });
  }

  public stopEngine(queryParam: EngineQueryParam): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.engine)}?id=${queryParam.id}&status=${queryParam.status}`, {
      method: 'PATCH',
    });
  }

  public drive(queryParam: EngineQueryParam): Promise<Response> {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.engine)}?id=${queryParam.id}&status=${queryParam.status}`, {
      method: 'PATCH',
    });
  }
}
