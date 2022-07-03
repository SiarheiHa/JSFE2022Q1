import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '3e7f1bf9b1ec458fbb4e528dff7e81ae', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

// Api keys:
// '3e7f1bf9b1ec458fbb4e528dff7e81ae'
// 'd89d2166fc4442d3a54187518bde8a56'
