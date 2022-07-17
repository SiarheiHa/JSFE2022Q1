import { Product, SearchModel } from '../../interfaces';

export class Search implements SearchModel {
    private _searchValue = '';

    public set searchValue(value: string) {
        this._searchValue = value.toLowerCase();
    }

    public filterBySearch(productsArr: Product[]): Product[] {
        if (this._searchValue === '') return productsArr;
        return [...productsArr].filter((product: Product) => product.set.toLowerCase().includes(this._searchValue));
    }
}
