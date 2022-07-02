export interface NewsSource {
    id: string;
    name: string;
}

export interface NewsSourceData extends NewsSource {
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface NewsItem {
    source: NewsSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type RequestOptions = {
    sources?: string;
};
export type GetRespParameter = {
    endpoint: string;
    options?: RequestOptions;
};

type ResponseData = {
    status: 'ok' | 'error';
    sources: NewsSourceData[];
    totalResults: number;
    articles: NewsItem[];
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
