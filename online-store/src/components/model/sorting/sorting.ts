import { SortingType, Product } from '../../interfaces';

export class Sorting {
    setSort(type: SortingType) {
        localStorage.setItem('sort', type);
    }

    getSort(): SortingType {
        return (localStorage.getItem('sort') as SortingType) || SortingType.default;
    }

    sortProducts(productsArr: Product[]) {
        const sortedProducts = [...productsArr];
        switch (this.getSort()) {
            case SortingType.piecesAscending:
                sortedProducts.sort((a, b) => a.pieces - b.pieces);
                break;
            case SortingType.piecesDescending:
                sortedProducts.sort((a, b) => b.pieces - a.pieces);
                break;
            case SortingType.priceAscending:
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case SortingType.priceDescending:
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        return sortedProducts;
    }
}
