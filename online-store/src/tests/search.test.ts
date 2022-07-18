import { Search } from '../components/model/filters/search';

describe('isIdInCartList', () => {
    const search = new Search();
    const testObj = {
        _id: '61df944eb226bd9df3bb4648',
        set: 'The Razor Crest',
        item_id: 752927529275292,
        reviews: 134,
        rating: '4.605769230769231',
        availability: 'Available now',
        price: 129,
        images: [
            'https://www.lego.com/cdn/cs/set/assets/blt7a4292faec34e557/75292.png?fit=bounds&format=png&width=455&height=315&dpr=1',
            'https://www.lego.com/cdn/cs/set/assets/blt077af3aa46f9b42b/102620-TOTY-SEAL-Winner.jpg?fit=bounds&format=jpg&quality=80&width=455&height=315&dpr=1',
        ],
        ages: '10+',
        pieces: 1023,
        __v: 0,
        isInCart: true,
        isFavorite: true,
    };

    it('should to contain testObj', () => {
        expect(search.filterBySearch([testObj])).toContain(testObj);
    });

    it('should to contain testObj', () => {
        expect(search.searchValue).not.toBeNull();
    });
});
