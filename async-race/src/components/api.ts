import {
  Car, CarsResponseObj, EngineQueryParam, QueryParam, WinnersQueryParam,
} from '../interfaces';

const BASE_LINK = 'http://127.0.0.1:3000';
enum Endpoint {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners',
}

const generateQueryString = (queryParam?: object) => {
  if (!queryParam) return '';
  const paramString = Object.keys(queryParam)
    .map((key: string) => `_${key}=${queryParam[key as keyof object]}`)
    .join('&');
  return `?${paramString}`;
};

const makeUrl = (base: string, endpoint: Endpoint, queryParam?: QueryParam | EngineQueryParam) => {
  const url = new URL(`${endpoint}${generateQueryString(queryParam)}`, base);
  return url;
};

export default class Api {
  baseLink = BASE_LINK;

  async getCars(queryParam?: QueryParam): Promise<CarsResponseObj> {
    const response = await fetch(makeUrl(BASE_LINK, Endpoint.garage, queryParam));
    if (!response.ok) {
      throw new Error('server is not available');
    }
    const count = response.headers.get('X-Total-Count');
    const cars: Car[] = await response.json();
    return {
      cars,
      count: count ? Number(count) : cars.length,
      page: queryParam?.page ? queryParam.page : 1,
    };
  }

  createCar(car: Pick<Car, 'name' | 'color'>) {
    return fetch(makeUrl(BASE_LINK, Endpoint.garage), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  deleteCar(id: string) {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.garage)}/${id}`, {
      method: 'DELETE',
    });
  }

  updateCar(id: string, car: Pick<Car, 'name' | 'color'>) {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.garage)}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  // async getWinners(queryParam?: WinnersQueryParam): Promise<WinnersResponseObj> {
  //   const response = await fetch(makeUrl(BASE_LINK, Endpoint.winners, queryParam));
  //   if (!response.ok) {
  //     throw new Error('server is not available');
  //   }
  //   // console.log(response);
  //   const count = response.headers.get('X-Total-Count');
  //   const winners: Winner[] = await response.json();
  //   // console.log(winners);
  //   return {
  //     winners,
  //     count: count ? Number(count) : winners.length,
  //     page: queryParam?.page ? queryParam.page : 1,
  //   };
  // }

  getWinners(queryParam?: WinnersQueryParam): Promise<Response> {
    return fetch(makeUrl(BASE_LINK, Endpoint.winners, queryParam));
  //   if (!response.ok) {
  //     throw new Error('server is not available');
  //   }
  //   // console.log(response);
  //   const count = response.headers.get('X-Total-Count');
  //   const winners: Winner[] = await response.json();
  //   // console.log(winners);
  //   return {
  //     winners,
  //     count: count ? Number(count) : winners.length,
  //     page: queryParam?.page ? queryParam.page : 1,
  //   };
  // }
  }

  getCar(id: string) {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.garage)}/${id}`);
  }

  startEngine(queryParam: EngineQueryParam) {
    return fetch(`${makeUrl(BASE_LINK, Endpoint.engine)}?id=${queryParam.id}&status=${queryParam.status}`, {
      // http://127.0.0.1:3000/engine?_id=13&_status=started
      method: 'PATCH',
    });
  }
}
