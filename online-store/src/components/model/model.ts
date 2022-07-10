import { ProductResponseObj } from '../db/db';

export interface Product extends ProductResponseObj {
    isFavorite: boolean;
    isInCart: boolean;
}

export class Model {
    products: Product[];
    favoriteList: number[] = [];
    // What is better: to store in catrList objects or store an array of productID ?
    cartList: Product[] = [];
    MAX_AMOUNT_OF_GOODS_IN_CART = 20;

    constructor(data: ProductResponseObj[]) {
        this.products = data.map((item) => {
            const product = { ...item, ...{ isFavorite: false, isInCart: false } };
            return product;
        });
    }

    get cartCounter() {
        return this.cartList.length;
    }

    getResponse() {
        console.log('Model - getResponse()');
        return this.products;
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
            } else {
                product.isInCart = true;
                this.cartList.push(product);
            }
        }
        console.log(this.cartList);
        return { status: 'ok', message: 'Item added' };
    }
}
