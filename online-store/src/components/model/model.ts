import { Product, ProductResponseObj } from '../interfaces';
import { Cart } from './cart/cart';
import { FavoriteList } from './favorite/favorite';
import { Filters } from './filters/filters';
import { Search } from './filters/search';
import { Sorting } from './sorting/sorting';

export class Model {
    public filters: Filters;
    public sorting: Sorting;
    public search: Search;
    private products: Product[];
    public favoriteList: FavoriteList;
    public cart: Cart;

    constructor(data: ProductResponseObj[]) {
        this.products = data.map((item: ProductResponseObj): Product => {
            const product: Product = { ...item, ...{ isFavorite: false, isInCart: false } };
            return product;
        });
        this.sorting = new Sorting();
        this.filters = new Filters();
        this.search = new Search();
        this.favoriteList = new FavoriteList(this.products);
        this.cart = new Cart(this.products);
        this.products.forEach((product: Product) => {
            product.isFavorite = this.favoriteList.isIdInFavoriteList(product.item_id);
            product.isInCart = this.cart.isIdInCartList(product.item_id);
        });
    }

    public getResponse(): Product[] {
        const sortedArr: Product[] = this.sorting.sortProducts(this.products);
        const filteredArr: Product[] = this.filters.filterProducts(sortedArr);
        const arrBySearch: Product[] = this.search.filterBySearch(filteredArr);

        return arrBySearch;
    }

    getMaxPropertyValue(key: keyof Product) {
        const max = [...this.products].sort((a, b) => Number(b[key]) - Number(a[key]))[0][key];
        return Number(max);
    }
}
