import { Product } from '../db/db';

export class Model {
    products: Product[];

    constructor(data: Product[]) {
        this.products = data;
    }

    getResponse() {
        console.log('Model - getResponse()');
        return this.products;
    }
}
