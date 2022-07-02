import {
    Callback,
    HTTPStatusCode,
    Endpoint,
    RequestOptions,
    ResponseDataSources,
    ResponseDataNews,
} from '../interfaces';

class Loader {
    private baseLink: string;
    private options: { apiKey: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options = {} }: { endpoint: Endpoint; options?: Partial<RequestOptions> },
        callback: Callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HTTPStatusCode.UNAUTHORIZED || res.status === HTTPStatusCode.NOT_FOUND)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<RequestOptions>, endpoint: Endpoint): string {
        const urlOptions: { [key: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;
        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    private load(method: string, endpoint: Endpoint, callback: Callback, options: Partial<RequestOptions> = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res): Promise<ResponseDataSources | ResponseDataNews> => res.json())
            .then((data: ResponseDataSources | ResponseDataNews) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
