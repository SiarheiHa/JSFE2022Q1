import { data, ProductResponseObj } from '../db/db';
import { Model } from '../model/model';
import { View } from '../view/view';

export class ShopApp {
    model: Model;
    view: View;
    data: ProductResponseObj[] = data;
    productsContainer = document.querySelector('.products') as HTMLElement;

    constructor() {
        this.model = new Model(data);
        this.view = new View(this.productsContainer);
    }
    start() {
        console.log('ShopApp - app start()');
        const productsForView = this.model.getResponse();
        this.view.drawProducts(productsForView);

        this.addProductsHandler();
    }

    addProductsHandler() {
        this.productsContainer.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const productID = Number(target.parentElement?.dataset.product_id);
            if (target.classList.contains('favorite-icon')) {
                // console.log(this.model.isFavorite(productID));
                console.log('favorite-icon is clicked, productID', productID);

                this.model.toggleFavoriteStatus(productID);
                this.view.toggleClassActive(target);
            } else if (target.classList.contains('button')) {
                console.log('button is clicked productID', productID);
            }
        });
    }
}
