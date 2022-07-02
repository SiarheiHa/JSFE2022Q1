interface NewsSource {
    id: string;
    name: string;
}

export interface NewsSourceData extends Readonly<NewsSource> {
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface NewsItem {
    source: Readonly<NewsSource>;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type RequestOptions = {
    sources: string;
    searchIn: string;
    domains: string;
    q: string;
    excludeDomains: string;
    from: string;
    to: string;
    language: string;
    sortBy: string;
    pageSize: string;
    page: string;
};

export enum Endpoint {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}

type ResponseData = {
    status: 'ok' | 'error';
    sources: Readonly<NewsSourceData>[];
    totalResults: number;
    articles: Readonly<NewsItem>[];
};

export type ResponseDataSources = Pick<ResponseData, 'status' | 'sources'>;
export type ResponseDataNews = Omit<ResponseData, 'sources'>;

export enum HTTPStatusCode {
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
}

export type Callback = (data: ResponseDataSources | ResponseDataNews) => void;

// Interfaces for classes

export interface ISources {
    draw(data: NewsSourceData[]): void;
}

export interface INews {
    draw(data: NewsItem[]): void;
}

export interface IAppView {
    drawNews(data: ResponseData): void;
    drawSources(data: ResponseData): void;
}

export interface Controller {
    getSources(callback: Callback): void;
    getNews(e: Event, callback: Callback): void;
}

export interface NewsApp {
    start(): void;
}
