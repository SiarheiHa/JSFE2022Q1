import { ProductResponseObj, SortingType } from '../interfaces';
import { data } from '../db/db';
import { Model } from '../model/model';
import { View } from '../view/view';
import * as noUiSlider from 'nouislider';

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
        this.getProducts();
        this.createSliders();
        this.addProductsHandler();
        this.addFiltersHandler();
        this.addSearchHandler();
    }

    getProducts() {
        const productsForView = this.model.getResponse();
        this.view.checkCheckboxes(this.model.getSort(), [
            ...this.model.getFilters('exclusion-filters'),
            ...this.model.getFilters('complementary-filters'),
        ]);
        this.view.drawCartCounter(this.model.cartCounter);
        this.view.drawProducts(productsForView);
    }

    addFiltersHandler() {
        const filters = document.querySelector('.filters');
        if (!(filters instanceof HTMLElement)) {
            throw new Error('Filter not found');
        }
        filters.addEventListener('change', (e: Event) => {
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
            this.view.resetSliders();
            this.getProducts();
        });

        filters.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof HTMLInputElement && target.value === 'reset settings') {
                this.model.resetFilters();
                this.view.resetSliders();
                //очистить избранное
                this.model.clearFavoriteList();
                //очистить корзину в лс
                this.model.clearCart();
                //reset sort
                this.model.setSort(SortingType.default);
                this.getProducts();
            }
        });
    }

    addSearchHandler() {
        const searchInput = document.querySelector('.search');
        if (!(searchInput instanceof HTMLInputElement)) {
            throw new Error('searchInput is not found');
        }

        searchInput.focus();

        searchInput.addEventListener('input', () => {
            this.model.searchValue = searchInput.value;
            this.getProducts();
        });
    }

    createSliders() {
        const sliders = document.querySelectorAll('.slider__line');
        sliders.forEach((slider: Element) => {
            if (!(slider instanceof HTMLElement)) {
                throw new Error('slider not found');
            }
            const filterType = slider.dataset.filter_type as keyof ProductResponseObj;

            if (filterType === undefined) {
                throw new Error('Unknown filter value');
            }

            const maxSliderValue = this.model.getMaxPropertyValue(filterType);

            const sliderFiltersValues = this.model.getFilters(filterType)[0] || `0-${maxSliderValue}`;

            const [minFilterValue, maxFilterValue] = sliderFiltersValues.split('-');

            slider = this.view.drawSlider(slider, Number(minFilterValue), Number(maxFilterValue), maxSliderValue);
            this.addSliderHandler(slider as noUiSlider.target);
        });
    }

    addSliderHandler(slider: noUiSlider.target) {
        slider.noUiSlider?.on('update', (values) => {
            const [minPrice, maxPrice] = values;
            localStorage.removeItem(slider.dataset.filter_type as string);
            this.model.addFilter(slider.dataset.filter_type as string, `${minPrice}-${maxPrice}`);
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
                this.model.toggleFavoriteStatus(productID);
            } else if (target.classList.contains('button')) {
                const resultOfAddingToCart = this.model.toggleCartStatus(productID);
                if (resultOfAddingToCart.status !== 'ok') {
                    this.view.modal.buildModal(resultOfAddingToCart.message);
                    return;
                }
                this.view.drawCartCounter(this.model.cartCounter);
            }

            this.view.toggleClassActive(target);
        });
    }
}
