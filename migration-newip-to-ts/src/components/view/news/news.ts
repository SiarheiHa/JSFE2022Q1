import './news.css';
import { INews, NewsItem } from '../../interfaces';

class News implements INews<NewsItem[]> {
    public drawNews(data: NewsItem[]): void {
        const news: NewsItem[] = data.length >= 10 ? data.slice(0, 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: NewsItem, idx: number) => {
            const placeHolderPath = 'img/news_placeholder.jpg';
            const imgUrlPath = `url(${item.urlToImage || placeHolderPath})`;
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            const newsItem = newsClone.querySelector('.news__item') as HTMLElement;
            const newsImage = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            const newsAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
            const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
            const newsDescriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
            const newsDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
            const newsDescriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
            const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLElement;

            if (idx % 2) newsItem.classList.add('alt');

            newsImage.style.backgroundImage = imgUrlPath;
            newsAuthor.textContent = item.author || item.source.name;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            newsDescriptionTitle.textContent = item.title;
            newsDescriptionSource.textContent = item.source.name;
            newsDescriptionContent.textContent = item.description;
            readMoreLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        (document.querySelector('.news') as HTMLElement).innerHTML = '';
        (document.querySelector('.news') as HTMLElement).appendChild(fragment);
    }
}

export default News;
