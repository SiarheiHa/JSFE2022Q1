import { Product, ProductResponseObj, ResultOfToggleCartStatus } from '../interfaces';
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

    constructor(data: ProductResponseObj[]) {
        this.products = data.map((item: ProductResponseObj): Product => {
            const product: Product = { ...item, ...{ isFavorite: false, isInCart: false } };
            product.isFavorite = this.isIdInFavoriteList(product.item_id);
            product.isInCart = this.isIdInCartList(product.item_id);

            return product;
        });
        this.sorting = new Sorting();
        this.filters = new Filters();
        this.search = new Search();
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

    //favorites

    getFavorites() {
        return (JSON.parse(localStorage.getItem('favorites') as string) as string[]) || [];
    }

    clearFavoriteList() {
        localStorage.removeItem('favorites');
        this.products.forEach((product: Product) => (product.isFavorite = false));
    }

    addFavorite(productID: number) {
        const favorites = this.getFavorites();
        favorites.push(String(productID));
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    deleteFavorite(productID: number) {
        const favorites = this.getFavorites().filter((product) => product !== String(productID));
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    isIdInFavoriteList(productID: number) {
        return this.getFavorites().includes(String(productID));
    }

    getProductByID(productID: number) {
        return this.products.find((product) => product.item_id === productID);
    }

    toggleFavoriteStatus(productID: number) {
        const product = this.getProductByID(productID);
        if (product) {
            if (product.isFavorite) {
                this.deleteFavorite(productID);
            } else {
                this.addFavorite(productID);
            }
            product.isFavorite = !product.isFavorite;
        }
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
