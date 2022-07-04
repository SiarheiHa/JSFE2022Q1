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
        const sourceContainer = document.querySelector('.sources') as HTMLDivElement;
        sourceContainer.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: ResponseDataNews | ResponseDataSources) =>
                this.view.drawNews(data as ResponseDataNews)
            )
        );
        this.controller.getSources((data: ResponseDataNews | ResponseDataSources) =>
            this.view.drawSources(data as ResponseDataSources)
        );
    }
}

export default App;
