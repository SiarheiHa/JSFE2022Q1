import { CartModel, Product, ResultOfToggleCartStatus } from '../../interfaces';

const MAX_AMOUNT_OF_GOODS_IN_CART = 20;

export class Cart implements CartModel {
    constructor(private products: Product[]) {
        this.products = products;
    }

    private getProductByID(productID: number): Product | undefined {
        return this.products.find((product) => product.item_id === productID);
    }

    public toggleCartStatus(productID: number): ResultOfToggleCartStatus {
        const product: Product | undefined = this.getProductByID(productID);
        if (product) {
            if (!product.isInCart && this.cartCounter >= MAX_AMOUNT_OF_GOODS_IN_CART) {
                return { status: `rejected`, message: 'Извините, все слоты заполнены' };
            }

            if (product.isInCart) {
                product.isInCart = false;
                this.deleteFromCart(productID);
            } else if (product.availability !== 'Available now') {
                return { status: 'rejected', message: 'Sorry, the product is out of stock' };
            } else {
                product.isInCart = true;
                this.addToCart(productID);
            }
        }
        return { status: 'ok', message: 'status toggled' };
    }

    private getCart(): string[] {
        return (JSON.parse(localStorage.getItem('cart') as string) as string[]) || [];
    }

    private addToCart(productID: number): void {
        const cart: string[] = this.getCart();
        cart.push(String(productID));
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    private deleteFromCart(productID: number) {
        const cart: string[] = this.getCart().filter((product) => product !== String(productID));
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    public isIdInCartList(productID: number): boolean {
        return this.getCart().includes(String(productID));
    }

    public clearCart(): void {
        localStorage.removeItem('cart');
        this.products.forEach((product: Product) => (product.isInCart = false));
    }

    get cartCounter() {
        return this.getCart().length;
    }
}
