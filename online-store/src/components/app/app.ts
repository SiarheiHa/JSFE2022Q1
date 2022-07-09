import { Controller } from '../controller/controller';
import { View } from '../view/view';

export class ShopApp {
    controller: Controller;
    view: View;

    constructor() {
        this.controller = new Controller();
        this.view = new View();
    }
    start() {
        console.log('ShopApp - app start()');
        const productsForView = this.controller.getGoods();
        this.view.drawProducts(productsForView);
    }
}
