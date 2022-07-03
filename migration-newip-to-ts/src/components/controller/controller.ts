import AppLoader from './appLoader';
import { Controller, Callback, Endpoint } from '../interfaces';
import { addClassActive } from '../view/addClassActive';

class AppController extends AppLoader implements Controller {
    public getSources(callback: Callback) {
        super.getResp(
            {
                endpoint: Endpoint.SOURCES,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoint.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                addClassActive(target);
                return;
            }

            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
