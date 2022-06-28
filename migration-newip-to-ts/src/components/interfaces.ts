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

export type ResponseData = {
    status: string;
    sources?: NewsSourceData[];
    totalResults?: number;
    articles?: NewsItem[];
};

export enum HTTPStatusCode {
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
}

export type Callback = (data: ResponseData) => void;
