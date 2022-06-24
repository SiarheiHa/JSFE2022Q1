import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'd89d2166fc4442d3a54187518bde8a56', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
