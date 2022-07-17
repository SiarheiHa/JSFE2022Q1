import { SortingType, Product, SortingModel } from '../../interfaces';

export class Sorting implements SortingModel {
    public setSort(type: SortingType): void {
        localStorage.setItem('sort', type);
    }

    public getSort(): SortingType {
        return (localStorage.getItem('sort') as SortingType) || SortingType.default;
    }

    public sortProducts(productsArr: Product[]) {
        const sortedProducts: Product[] = [...productsArr];
        switch (this.getSort()) {
            case SortingType.piecesAscending:
                sortedProducts.sort((a: Product, b: Product) => a.pieces - b.pieces);
                break;
            case SortingType.piecesDescending:
                sortedProducts.sort((a: Product, b: Product) => b.pieces - a.pieces);
                break;
            case SortingType.priceAscending:
                sortedProducts.sort((a: Product, b: Product) => a.price - b.price);
                break;
            case SortingType.priceDescending:
                sortedProducts.sort((a: Product, b: Product) => b.price - a.price);
                break;
            default:
                break;
        }
        return sortedProducts;
    }
}
