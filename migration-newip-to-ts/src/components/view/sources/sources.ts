import './sources.css';
import { ISources, NewsSourceData } from '../../interfaces';
import { addClassActive } from '../addClassActive';

class Sources implements ISources<NewsSourceData[]> {
    public drawSources(data: NewsSourceData[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const sourcesLetterList = document.createElement('div');
        const firstLetterSet: string[] = [...new Set(data.map((item: NewsSourceData) => item.name[0].toUpperCase()))];

        data.forEach((item: NewsSourceData) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
            (sourceClone.querySelector('.source__item') as HTMLElement).classList.add('hidden');

            fragment.append(sourceClone);
        });

        firstLetterSet.forEach((letter: string) => {
            const span = document.createElement('span');
            span.innerHTML = letter;
            span.dataset.letter = letter;
            span.classList.add('letter-list__item');
            sourcesLetterList.append(span);
        });

        sourcesLetterList.classList.add('letter-list');
        (document.querySelector('main') as HTMLElement).prepend(sourcesLetterList);
        (document.querySelector('.sources') as HTMLElement).append(fragment);
        this.addListHandler(sourcesLetterList);

        if (firstLetterSet.length) {
            this.sortSourcesByLetter(firstLetterSet[0]);
            addClassActive(sourcesLetterList.firstChild as HTMLElement);
        }
    }

    private addListHandler(list: HTMLDivElement): void {
        list.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (target?.classList.contains('letter-list__item')) {
                this.sortSourcesByLetter(String(target.dataset.letter));
                addClassActive(target);
            }
        });
    }

    private sortSourcesByLetter(letter: string): void {
        const buttonSpans: NodeListOf<Element> = document.querySelectorAll('.source__item-name');
        buttonSpans.forEach((span: Element) => {
            if (span.parentElement) {
                span.parentElement.classList.add('hidden');
                if (span.innerHTML[0] === letter) {
                    span.parentElement.classList.remove('hidden');
                }
            }
        });
    }
}

export default Sources;
