import { CarsResponseObj, QueryParam } from '../interfaces';

const BASE_LINK = 'http://127.0.0.1:3000';
enum Endpoint {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners',
}

const generateQueryString = (queryParam?: QueryParam) => {
  if (!queryParam) return '';
  const paramString = Object.keys(queryParam)
    .map((key: string) => `${key}=${queryParam[key as keyof QueryParam]}`)
    .join('&');
  return `?${paramString}`;
};

const makeUrl = (base: string, endpoint: Endpoint, queryParam?: QueryParam) => {
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
    return {
      cars: await response.json(),
      count: count ? Number(count) : this.getCars.length,
    };
  }
}
