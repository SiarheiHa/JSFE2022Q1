import { data, ProductResponseObj } from '../db/db';
import { Model, SortingType } from '../model/model';
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
        this.view.drawCartCounter(this.model.cartCounter);
        this.getProducts();
        this.view.checkChekboxes(this.model.getSort(), [
            ...this.model.getFilters('exclusion-filters'),
            ...this.model.getFilters('complementary-filters'),
        ]);
        this.addProductsHandler();
        this.addFiltersHandler();
    }

    getProducts() {
        const productsForView = this.model.getResponse();
        this.view.drawProducts(productsForView);
    }

    addFiltersHandler() {
        const filters = document.querySelector('.filters');
        if (!(filters instanceof HTMLElement)) {
            throw new Error('Select not found');
        }
        filters.addEventListener('change', (e: Event) => {
            console.log(e);
            const target = e.target;
            if (!(target instanceof HTMLElement)) {
                throw new Error('Target is not defined');
            }

            if (target instanceof HTMLSelectElement) {
                this.model.setSort(target.value as SortingType);
            }

            if (target instanceof HTMLInputElement) {
                const filterType = target.parentElement?.parentElement?.dataset.filter_type;
                if (filterType) this.model.setFiltersValue(filterType, target.value, target.checked);
            }
            this.getProducts();
        });

        filters.addEventListener('reset', () => {
            this.model.resetFilters();
            this.getProducts();
        });
    }

    addProductsHandler() {
        this.productsContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (!(target instanceof HTMLElement)) {
                throw new Error('Target is not defined');
            }
            const productID = Number(target.parentElement?.dataset.product_id);

            if (target.classList.contains('favorite-icon')) {
                console.log('favorite-icon is clicked, productID', productID);
                this.model.toggleFavoriteStatus(productID);
            } else if (target.classList.contains('button')) {
                console.log('button is clicked productID', productID);
                const resultOfAddingToCart = this.model.toggleCartStatus(productID);
                if (resultOfAddingToCart.status !== 'ok') {
                    this.view.drawModalWindfow(resultOfAddingToCart.message);
                    return;
                }
                this.view.drawCartCounter(this.model.cartCounter);
            }

            this.view.toggleClassActive(target);
        });
    }
}
