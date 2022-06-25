interface NewsSource {
    id: string;
    name: string;
}

interface NewsSourceData extends NewsSource {
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

interface NewsItem {
    source: NewsSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export { NewsSource, NewsSourceData, NewsItem };
