import { Product, SortingType, FilterType, ResultOfToggleCartStatus, ShopAppModel } from '../interfaces';
import { data } from '../db/db';
import { Model } from '../model/model';
import { View } from '../view/view';
import * as noUiSlider from 'nouislider';

export class ShopApp implements ShopAppModel {
    private model: Model;
    private view: View;
    private productsContainer = document.querySelector('.products') as HTMLElement;

    constructor() {
        this.model = new Model(data);
        this.view = new View(this.productsContainer);
    }
    public start(): void {
        this.getData();
        this.createSliders();
        this.addProductsHandler();
        this.addFiltersHandler();
        this.addSearchHandler();
    }

    private getData(): void {
        const productsForView: Product[] = this.model.getResponse();
        this.view.checkCheckboxes(this.model.sorting.getSort(), [
            ...this.model.filters.getFilters(FilterType.exclusion),
            ...this.model.filters.getFilters(FilterType.complementary),
        ]);
        this.view.drawCartCounter(this.model.cartCounter);
        this.view.drawProducts(productsForView);
    }

    private addFiltersHandler(): void {
        const filters = document.querySelector('.filters');
        if (!(filters instanceof HTMLElement)) {
            throw new Error('Filters not found');
        }
        filters.addEventListener('change', (e: Event) => {
            const target = e.target;
            if (!(target instanceof HTMLElement)) {
                throw new Error('Target is not defined');
            }

            if (target instanceof HTMLSelectElement) {
                this.model.sorting.setSort(target.value as SortingType);
            }

            if (target instanceof HTMLInputElement) {
                const filterType = target.parentElement?.parentElement?.dataset.filter_type;
                if (filterType) this.model.filters.setFiltersValue(filterType, target.value, target.checked);
            }

            this.getData();
        });

        filters.addEventListener('reset', () => {
            this.model.filters.resetFilters();
            this.view.slider.resetSliders();

            this.getData();
        });

        filters.addEventListener('click', (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLInputElement && target.value === 'reset settings') {
                this.model.filters.resetFilters();
                this.view.slider.resetSliders();
                this.model.clearFavoriteList();
                this.model.clearCart();
                this.model.sorting.setSort(SortingType.default);

                this.getData();
            }
        });
    }

    private addSearchHandler(): void {
        const searchInput = document.querySelector('.search');
        if (!(searchInput instanceof HTMLInputElement)) {
            throw new Error('searchInput is not found');
        }

        searchInput.focus();

        searchInput.addEventListener('input', () => {
            this.model.search.searchValue = searchInput.value;

            this.getData();
        });
    }

    private createSliders(): void {
        const sliders = document.querySelectorAll('.slider__line');
        sliders.forEach((slider: Element) => {
            if (!(slider instanceof HTMLElement)) {
                throw new Error('slider not found');
            }
            const filterType = slider.dataset.filter_type as keyof Product;

            if (filterType === undefined) {
                throw new Error('Unknown filter value');
            }

            const maxSliderValue: number = this.model.getMaxPropertyValue(filterType);
            const sliderFiltersValues: string = this.model.filters.getFilters(filterType)[0] || `0-${maxSliderValue}`;
            const [minFilterValue, maxFilterValue]: string[] = sliderFiltersValues.split('-');

            this.view.slider.drawSlider(slider, Number(minFilterValue), Number(maxFilterValue), maxSliderValue);
            this.addSliderHandler(slider as noUiSlider.target);
        });
    }

    private addSliderHandler(slider: noUiSlider.target): void {
        slider.noUiSlider?.on('update', (values) => {
            const [minPrice, maxPrice]: (string | number)[] = values;
            const filterType = slider.dataset.filter_type as keyof Product;
            localStorage.removeItem(filterType);
            this.model.filters.addFilter(filterType, `${minPrice}-${maxPrice}`);

            this.getData();
        });
    }

    private addProductsHandler(): void {
        this.productsContainer.addEventListener('click', (e: Event) => {
            const target = e.target;
            if (!(target instanceof HTMLElement)) {
                throw new Error('Target is not defined');
            }
            const productID = Number(target.parentElement?.dataset.product_id);

            if (target.classList.contains('favorite-icon')) {
                this.model.toggleFavoriteStatus(productID);
            } else if (target.classList.contains('button')) {
                const resultOfToggleCartStatus: ResultOfToggleCartStatus = this.model.toggleCartStatus(productID);
                if (resultOfToggleCartStatus.status === 'rejected') {
                    this.view.modal.buildModal(resultOfToggleCartStatus.message);
                    return;
                }
                this.view.drawCartCounter(this.model.cartCounter);
            }

            this.view.toggleClassActive(target);
        });
    }
}
