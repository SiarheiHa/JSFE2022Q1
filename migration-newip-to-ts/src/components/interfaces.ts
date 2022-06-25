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

export { NewsSource, NewsSourceData };
