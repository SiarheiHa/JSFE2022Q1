import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiKey = '3e7f1bf9b1ec458fbb4e528dff7e81ae';
        const API_URL = 'https://newsapi.org/v2/';

        super(API_URL, {
            apiKey: apiKey, // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

// Api keys:
// '3e7f1bf9b1ec458fbb4e528dff7e81ae'
// 'd89d2166fc4442d3a54187518bde8a56'
