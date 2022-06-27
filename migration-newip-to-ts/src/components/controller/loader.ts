import { GetRespParameter, Callback, RequestOptions, ResponseData } from '../interfaces';

class Loader {
    baseLink: string;
    options: { apiKey: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: GetRespParameter,
        callback: Callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: { [key: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;
        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Callback, options: RequestOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data: ResponseData) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
