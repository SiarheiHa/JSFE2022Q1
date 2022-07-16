import { Product, SortingType } from '../interfaces';
import { createNode } from '../utils/createNode';
import { Modal } from './modal/modal';
import { Slider } from './slider/slider';

export class View {
    productsContainer: HTMLElement;
    modal: Modal;
    slider: Slider;

    constructor(container: HTMLElement) {
        this.productsContainer = container;
        this.modal = new Modal();
        this.slider = new Slider();
    }

    toggleClassActive(target: HTMLElement) {
        target.classList.toggle(`${target.classList[0]}_active`);
    }

    drawProducts(products: Product[]) {
        this.productsContainer.innerHTML = '';
        if (products.length === 0) {
            const notFoundMessage = createNode({
                tag: 'p',
                classes: ['not-found-message'],
                inner: 'Извините, совпадений не обнаружено',
            });
            this.productsContainer.append(notFoundMessage);
            return;
        }
        products.forEach((product) => {
            const productDiv = createNode({
                tag: 'div',
                classes: ['product'],
                atributesAdnValues: [['data-product_id', `${product.item_id}`]],
            });
            const favoriteIcon = createNode({
                tag: 'img',
                classes: ['favorite-icon'],
                atributesAdnValues: [
                    ['src', './images/favorite-svgrepo-com.svg'],
                    ['alt', 'favorite icon'],
                    ['width', '40'],
                ],
            });
            if (product.isFavorite) this.toggleClassActive(favoriteIcon);
            const title = createNode({ tag: 'p', classes: ['product__title'], inner: product.set });
            const productImageWrapper = createNode({ tag: 'div', classes: ['product__img-wrapper'] });
            const productImage = createNode({
                tag: 'img',
                classes: ['product__img'],
                atributesAdnValues: [
                    ['src', product.images[0]],
                    ['alt', 'product image'],
                ],
            });
            const price = createNode({ tag: 'p', classes: ['product__price'], inner: `$${product.price}` });
            const availability = createNode({
                tag: 'p',
                classes: ['product__availability'],
                inner: product.availability,
            });
            const age = createNode({ tag: 'p', classes: ['product__ages'], inner: `age: ${product.ages}` });
            const pieces = createNode({ tag: 'p', classes: ['product__pieces'], inner: `pieces: ${product.pieces}` });
            const rating = createNode({
                tag: 'p',
                classes: ['product__rating'],
                inner: `rating: ${Number(product.rating).toFixed(1)}`,
            });
            const button = createNode({ tag: 'button', classes: ['button'] });
            if (product.isInCart) this.toggleClassActive(button);

            productImageWrapper.append(productImage);
            productDiv.append(
                favoriteIcon,
                title,
                productImageWrapper,
                price,
                availability,
                age,
                pieces,
                rating,
                button
            );
            this.productsContainer.append(productDiv);
        });
    }

    drawCartCounter(countOfProducts: number) {
        const counter = document.querySelector('.cart__counter');
        if (!counter) {
            throw new Error('Counter is not defined!');
        }
        counter.innerHTML = String(countOfProducts);
    }

    checkCheckboxes(sort: SortingType, filters: string[]) {
        const option = document.getElementById(sort);
        if (option instanceof HTMLOptionElement) {
            option.selected = true;
        }

        const checkboxes = document.querySelectorAll('input');
        filters.forEach((filter) => {
            checkboxes.forEach((checkbox) => {
                if (checkbox.value === filter) checkbox.checked = true;
            });
        });
    }
}
