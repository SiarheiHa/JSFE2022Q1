import { Product } from '../model/model';
import { createNode } from '../utils/createNode';

export class View {
    toggleClassActive(target: HTMLElement) {
        console.log('toggleClassActive');
        target.classList.toggle(`${target.classList[0]}_active`);
    }
    productsContainer: HTMLElement;

    constructor(container: HTMLElement) {
        this.productsContainer = container;
    }

    drawProducts(products: Product[]) {
        console.log('View - drawProducts');
        console.log('I draw cards');
        this.productsContainer.innerHTML = '';
        console.log(this.productsContainer);
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
                    ['src', '../src/assets/favorite-svgrepo-com.svg'],
                    ['alt', 'favorite icon'],
                    ['width', '40'],
                ],
            });
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
            const button = createNode({ tag: 'button', classes: ['button'], inner: `Add to card` });

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
}

// {
//     _id: '61df944eb226bd9df3bb4648',
//     set: 'The Razor Crest',
//     item_id: 752927529275292,
//     reviews: 134,
//     rating: '4.605769230769231',
//     availability: 'Available now',
//     price: 129,
//     images: [
//         'https://www.lego.com/cdn/cs/set/assets/blt7a4292faec34e557/75292.png?fit=bounds&format=png&width=455&height=315&dpr=1',
//         'https://www.lego.com/cdn/cs/set/assets/blt077af3aa46f9b42b/102620-TOTY-SEAL-Winner.jpg?fit=bounds&format=jpg&quality=80&width=455&height=315&dpr=1',
//     ],
//     ages: '10+',
//     pieces: 1023,
//     __v: 0,
// },
