import AppController from '../controller/controller';
import { ResponseDataNews, ResponseDataSources } from '../interfaces';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data as ResponseDataNews))
        );
        this.controller.getSources((data) => this.view.drawSources(data as ResponseDataSources));
    }
}

export default App;
