import { Product, ProductResponseObj, ResultOfToggleCartStatus } from '../interfaces';
import { FavoriteList } from './favorite/favorite';
import { Filters } from './filters/filters';
import { Search } from './filters/search';
import { Sorting } from './sorting/sorting';

const MAX_AMOUNT_OF_GOODS_IN_CART = 20;
// const FILTER_TYPES = ['exclusion-filters', 'complementary-filters'];

export class Model {
    public filters: Filters;
    public sorting: Sorting;
    public search: Search;
    private products: Product[];
    public favoriteList: FavoriteList;

    constructor(data: ProductResponseObj[]) {
        this.products = data.map((item: ProductResponseObj): Product => {
            const product: Product = { ...item, ...{ isFavorite: false, isInCart: false } };
            return product;
        });
        this.sorting = new Sorting();
        this.filters = new Filters();
        this.search = new Search();
        this.favoriteList = new FavoriteList(this.products);
        this.products.forEach((product: Product) => {
            product.isFavorite = this.favoriteList.isIdInFavoriteList(product.item_id);
            product.isInCart = this.isIdInCartList(product.item_id);
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

    //cart

    getProductByID(productID: number) {
        return this.products.find((product) => product.item_id === productID);
    }

    toggleCartStatus(productID: number): ResultOfToggleCartStatus {
        const product = this.getProductByID(productID);
        if (product) {
            if (!product.isInCart && this.cartCounter >= MAX_AMOUNT_OF_GOODS_IN_CART) {
                return { status: `rejected`, message: 'Извините, все слоты заполнены' };
            }

            if (product.isInCart) {
                product.isInCart = false;
                this.deleteFromCart(productID);
            } else if (product.availability !== 'Available now') {
                return { status: 'rejected', message: 'Sorry, the product is out of stock' };
            } else {
                product.isInCart = true;
                this.addToCart(productID);
            }
        }
        return { status: 'ok', message: 'status toggled' };
    }

    getCart() {
        return (JSON.parse(localStorage.getItem('cart') as string) as string[]) || [];
    }

    addToCart(productID: number) {
        const cart = this.getCart();
        cart.push(String(productID));
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    deleteFromCart(productID: number) {
        const cart = this.getCart().filter((product) => product !== String(productID));
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    isIdInCartList(productID: number) {
        return this.getCart().includes(String(productID));
    }

    clearCart() {
        localStorage.removeItem('cart');
        this.products.forEach((product: Product) => (product.isInCart = false));
    }

    get cartCounter() {
        return this.getCart().length;
    }
}
