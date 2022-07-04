import { View, ResponseDataSources, ResponseDataNews, NewsItem, NewsSourceData } from '../interfaces';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements View {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ResponseDataNews): void {
        const values: NewsItem[] = data?.articles ? data.articles : [];
        this.news.drawNews(values);
    }

    public drawSources(data: ResponseDataSources): void {
        const values: NewsSourceData[] = data?.sources ? data.sources : [];
        this.sources.drawSources(values);
    }
}

export default AppView;
