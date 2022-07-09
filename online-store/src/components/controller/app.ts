import { data, Product } from '../db/db';
import { Model } from '../model/model';
import { View } from '../view/view';

export class ShopApp {
    model: Model;
    view: View;
    data: Product[] = data;

    constructor() {
        this.model = new Model(data);
        this.view = new View();
    }
    start() {
        console.log('ShopApp - app start()');
        const productsForView = this.model.getResponse();
        this.view.drawProducts(productsForView);
    }
}
