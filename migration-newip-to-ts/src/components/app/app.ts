import AppController from '../controller/controller';
import { NewsApp, ResponseDataNews, ResponseDataSources } from '../interfaces';
import { AppView } from '../view/appView';

class App implements NewsApp {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data as ResponseDataNews))
        );
        this.controller.getSources((data) => this.view.drawSources(data as ResponseDataSources));
    }
}

export default App;
