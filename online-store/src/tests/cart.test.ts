import { data } from '../components/db/db';
import { Cart } from '../components/model/cart/cart';

describe('isIdInCartList', () => {
    const testData = data.map((item) => {
        const product = { ...item, ...{ isFavorite: false, isInCart: false } };
        return product;
    });
    const cart = new Cart(testData);

    it('should to equal false', () => {
        expect(cart.isIdInCartList(752927529275292)).toEqual(false);
    });

    it('should to match object', () => {
        expect(cart.toggleCartStatus(752927529275292)).toMatchObject({ status: 'ok', message: 'status toggled' });
    });

    it('cartcounter should to be greater -1', () => {
        expect(cart.cartCounter).toBeGreaterThan(-1);
    });

    it('clearCart must be istance of Function', () => {
        expect(cart.clearCart).toBeInstanceOf(Function);
    });
});
