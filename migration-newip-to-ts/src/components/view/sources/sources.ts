import './sources.css';
import { Draw, NewsSourceData } from '../../interfaces';

class Sources implements Draw<NewsSourceData[]> {
    public draw(data: NewsSourceData[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const sourcesLetterList = document.createElement('div');
        const firstLetterSet = [...new Set(data.map((item) => item.name[0].toUpperCase()))];

        data.forEach((item: NewsSourceData) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
            (sourceClone.querySelector('.source__item') as HTMLElement).classList.add('hidden');

            fragment.append(sourceClone);
        });

        firstLetterSet.forEach((letter) => {
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
    }

    private addListHandler(list: HTMLDivElement) {
        list.addEventListener('click', (e) => {
            if (e.target instanceof HTMLElement && e.target.classList.contains('letter-list__item')) {
                this.sortSourcesByLetter(e.target.dataset.letter as string);
            }
        });
    }

    private sortSourcesByLetter(letter: string) {
        const buttonSpans = document.querySelectorAll('.source__item-name');
        buttonSpans.forEach((span) => {
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
