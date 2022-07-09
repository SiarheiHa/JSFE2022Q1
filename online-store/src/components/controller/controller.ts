import { data, Product } from '../db/db';
import { Model } from '../model/model';

export class Controller {
    data: Product[] = data;
    model: Model;

    constructor() {
        this.model = new Model(data);
    }

    getGoods() {
        console.log('controller - getGoods()');
        return this.model.getResponse();
    }
}
