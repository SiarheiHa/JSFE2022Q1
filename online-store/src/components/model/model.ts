import { ProductResponseObj } from '../db/db';

const HIGH_RATING_VALUE = 4.3;
const MAX_AMOUNT_OF_GOODS_IN_CART = 20;
// const FILTER_TYPES = ['exclusion-filters', 'complementary-filters'];

export interface Product extends ProductResponseObj {
    isFavorite: boolean;
    isInCart: boolean;
}

export enum SortingType {
    default = 'default',
    priceAscending = 'priceAscending',
    priceDescending = 'priceDescending',
    piecesAscending = 'piecesAscending',
    piecesDescending = 'piecesDescending',
}

enum ExclusionFiltersType {
    availableNow = 'Available now',
    comingSoon = 'Coming Soon',
    highRated = 'High Rated',
    favorite = 'Favorite',
}

export class Model {
    products: Product[];

    constructor(data: ProductResponseObj[]) {
        this.products = data.map((item) => {
            const product = { ...item, ...{ isFavorite: false, isInCart: false } };
            product.isFavorite = this.isIdInFavoriteList(product.item_id);
            product.isInCart = this.isIdInCartList(product.item_id);

            return product;
        });
    }

    setSort(type: SortingType) {
        localStorage.setItem('sort', type);
    }

    getSort(): SortingType {
        return (localStorage.getItem('sort') as SortingType) || SortingType.default;
    }

    getFilters(filterType: string) {
        const filtersStr = localStorage.getItem(filterType);
        if (!filtersStr) {
            return [];
        }
        return JSON.parse(filtersStr) as string[];
    }

    addFilter(filterType: string, value: string) {
        const filters = this.getFilters(filterType);
        filters.push(value);
        localStorage.setItem(filterType, JSON.stringify(filters));
    }

    deleteFilter(filterType: string, value: string) {
        const filters = this.getFilters(filterType).filter((filterValue) => filterValue !== value);
        localStorage.setItem(filterType, JSON.stringify(filters));
    }

    getFavorites() {
        return (JSON.parse(localStorage.getItem('favorites') as string) as string[]) || [];
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

    getResponse() {
        // console.log('Model - getResponse()');
        const sortArr = this.sortProducts([...this.products]);
        const filteredArr = this.filterProducts(sortArr);

        return filteredArr;
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

    filterProducts(productsArr: Product[]) {
        const exclusionFilters = this.getFilters('exclusion-filters');
        const complementaryFilters = this.getFilters('complementary-filters');
        let filteredArr = [...productsArr];

        if (exclusionFilters.includes(ExclusionFiltersType.availableNow)) {
            filteredArr = filteredArr.filter(
                (product: Product) => product.availability === ExclusionFiltersType.availableNow
            );
        }
        if (exclusionFilters.includes(ExclusionFiltersType.comingSoon)) {
            filteredArr = filteredArr.filter(
                (product: Product) => product.availability === ExclusionFiltersType.comingSoon
            );
        }
        if (exclusionFilters.includes(ExclusionFiltersType.favorite)) {
            filteredArr = filteredArr.filter((product: Product) => product.isFavorite);
        }
        if (exclusionFilters.includes(ExclusionFiltersType.highRated)) {
            filteredArr = filteredArr.filter((product: Product) => Number(product.rating) > HIGH_RATING_VALUE);
        }

        /////// complementary-filters
        console.log(complementaryFilters);
        if (!complementaryFilters.length) return filteredArr;
        console.log(complementaryFilters);
        let resultArr: Product[] = [];

        complementaryFilters.forEach((age) => {
            resultArr = resultArr.concat(
                filteredArr.filter((product: Product) => {
                    return product.ages === age;
                })
            );
            console.log(resultArr);
        });

        console.log(resultArr);
        return resultArr;
    }

    setFiltersValue(filterType: string, value: string, isChecked: boolean) {
        isChecked ? this.addFilter(filterType, value) : this.deleteFilter(filterType, value);
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

    toggleCartStatus(productID: number) {
        const product = this.getProductByID(productID);
        if (product) {
            if (!product.isInCart && this.cartCounter >= MAX_AMOUNT_OF_GOODS_IN_CART) {
                return { status: `Can't add more items`, message: 'Извините, все слоты заполнены' };
            }

            if (product.isInCart) {
                product.isInCart = false;
                this.deleteFromCart(productID);
            } else if (product.availability !== 'Available now') {
                return { status: 'The product is out of stock', message: 'Sorry, the product is out of stock' };
            } else {
                product.isInCart = true;
                this.addToCart(productID);
            }
        }
        return { status: 'ok', message: 'Item added' };
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

    get cartCounter() {
        return this.getCart().length;
    }
}
