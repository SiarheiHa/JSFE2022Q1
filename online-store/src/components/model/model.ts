import { ProductResponseObj } from '../db/db';

export interface Product extends ProductResponseObj {
    isFavorite: boolean;
    isInCart: boolean;
}

export class Model {
    products: Product[];
    favoriteList: number[] = [];

    constructor(data: ProductResponseObj[]) {
        this.products = data.map((item) => {
            const product = { ...item, ...{ isFavorite: false, isInCart: false } };
            return product;
        });
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
        console.log(product);
    }
}
