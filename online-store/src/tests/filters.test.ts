import { Filters } from '../components/model/filters/filters';
const testFilters = new Filters();

describe('filterProducts', () => {
    it('to be truthly', () => {
        expect(testFilters.filterProducts([])).toBeTruthy();
    });
});

describe('getFilters', () => {
    it('should to be defined', () => {
        expect(testFilters.getFilters('exclusion-filters')).toBeDefined();
    });
});

describe('addFilter', () => {
    it('should to be undefined', () => {
        expect(testFilters.addFilter('str', 'str2')).toBeUndefined();
    });
});

describe('setFiltersValue', () => {
    it('should to be falsy', () => {
        expect(testFilters.setFiltersValue('str', 'str2', true)).toBeFalsy();
    });
});

describe('resetFilters', () => {
    it('should to be undefined', () => {
        expect(testFilters.resetFilters()).toBe(undefined);
    });
});
