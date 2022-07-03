import './sources.css';
import { ISources, NewsSourceData } from '../../interfaces';

class Sources implements ISources {
    public draw(data: NewsSourceData[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const sourcesLetterList = document.createElement('div');
        const firstLetterSet = [...new Set(data.map((item) => item.name[0].toUpperCase()))];

        data.forEach((item: NewsSourceData) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        firstLetterSet.forEach((letter) => {
            const span = document.createElement('span');
            span.innerHTML = letter;
            span.dataset.letter = letter;
            span.classList.add('letter');
            sourcesLetterList.append(span);
        });

        sourcesLetterList.classList.add('letter-list');
        (document.querySelector('main') as HTMLElement).prepend(sourcesLetterList);
        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
    
    public sort(event: Event) {}
}

export default Sources;
