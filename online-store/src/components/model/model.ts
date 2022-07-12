import { ProductResponseObj } from '../db/db';

const HIGH_RATING_VALUE = 4.3;

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

enum FiltersType {
    availableNow = 'Available now',
    comingSoon = 'Coming Soon',
    highRated = 'High Rated',
    favorite = 'Favorite',
}

export class Model {
    products: Product[];
    favoriteList: number[] = [];
    // What is better: to store in catrList objects or store an array of productID ?
    cartList: Product[] = [];
    MAX_AMOUNT_OF_GOODS_IN_CART = 20;
    _sort: SortingType = SortingType.default;
    filters: string[] = [];

    constructor(data: ProductResponseObj[]) {
        this.products = data.map((item) => {
            const product = { ...item, ...{ isFavorite: false, isInCart: false } };
            return product;
        });
    }

    get cartCounter() {
        return this.cartList.length;
    }

    set sort(type: SortingType) {
        this._sort = type;
    }

    getResponse() {
        console.log('Model - getResponse()');
        const sortArr = this.sortProducts([...this.products]);
        const filteredArr = this.filterProducts(sortArr);

        return filteredArr;
    }

    sortProducts(productsArr: Product[]) {
        const sortedProducts = [...productsArr];
        switch (this._sort) {
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
        console.log(this.filters);
        let filteredArr = [...productsArr];

        if (this.filters.includes(FiltersType.availableNow)) {
            filteredArr = filteredArr.filter((product: Product) => product.availability === FiltersType.availableNow);
        }
        if (this.filters.includes(FiltersType.comingSoon)) {
            filteredArr = filteredArr.filter((product: Product) => product.availability === FiltersType.comingSoon);
        }
        if (this.filters.includes(FiltersType.favorite)) {
            filteredArr = filteredArr.filter((product: Product) => product.isFavorite);
        }
        if (this.filters.includes(FiltersType.highRated)) {
            filteredArr = filteredArr.filter((product: Product) => Number(product.rating) > HIGH_RATING_VALUE);
        }
        return filteredArr;
    }

    setFiltersValue(value: string, isChecked: boolean) {
        isChecked
            ? this.filters.push(value)
            : (this.filters = this.filters.filter((filterType) => filterType !== value));
        console.log(this.filters);
    }

    // isFavorite(productID: number) {
    //     return this.favoriteList.includes(productID);
    // }

    getProductByID(productID: number) {
        return this.products.find((product) => product.item_id === productID);
    }

    toggleFavoriteStatus(productID: number) {
        const product = this.getProductByID(productID);
        if (product) product.isFavorite = !product.isFavorite;
    }

    toggleCartStatus(productID: number) {
        const product = this.getProductByID(productID);
        if (product) {
            if (!product.isInCart && this.cartCounter >= this.MAX_AMOUNT_OF_GOODS_IN_CART) {
                return { status: `Can't add more items`, message: 'Извините, все слоты заполнены' };
            }

            if (product.isInCart) {
                product.isInCart = false;
                this.cartList = this.cartList.filter((item) => item !== product);
            } else if (product.availability !== 'Available now') {
                return { status: 'The product is out of stock', message: 'Sorry, the product is out of stock' };
            } else {
                product.isInCart = true;
                this.cartList.push(product);
            }
        }
        console.log(this.cartList);
        return { status: 'ok', message: 'Item added' };
    }
}
