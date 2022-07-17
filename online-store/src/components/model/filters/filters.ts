import { Product, ExclusionFiltersType, FilterType, FiltersModel } from '../../interfaces';

const HIGH_RATING_VALUE = 4.3;

export class Filters implements FiltersModel {
    public getFilters(filterType: string): string[] {
        const filtersStr = localStorage.getItem(filterType);
        if (!filtersStr) {
            return [];
        }
        return JSON.parse(filtersStr) as string[];
    }

    public addFilter(filterType: string, value: string): void {
        const filters: string[] = this.getFilters(filterType);
        filters.push(value);
        localStorage.setItem(filterType, JSON.stringify(filters));
    }

    private deleteFilter(filterType: string, value: string): void {
        const filters: string[] = this.getFilters(filterType).filter((filterValue: string) => filterValue !== value);
        localStorage.setItem(filterType, JSON.stringify(filters));
    }

    public setFiltersValue(filterType: string, value: string, isChecked: boolean): void {
        isChecked ? this.addFilter(filterType, value) : this.deleteFilter(filterType, value);
    }

    public resetFilters(): void {
        const keys: string[] = Object.keys(localStorage);
        keys.forEach((key: string) => {
            if (key.includes('favorites') || key.includes('cart') || key.includes('sort')) return;
            localStorage.removeItem(key);
        });
    }

    public filterProducts(productsArr: Product[]): Product[] {
        const exclusionFilters: string[] = this.getFilters(FilterType.exclusion);
        const complementaryFilters: string[] = this.getFilters(FilterType.complementary);
        const sliderFiltersKeys = ['price', 'pieces'] as (keyof Product)[];

        let filteredArr: Product[] = [...productsArr];

        // slider-filters

        sliderFiltersKeys.forEach((key: keyof Product) => {
            const values: string = this.getFilters(key)[0];
            if (values === undefined) return;
            const [minValue, maxValue]: string[] = values.split('-');
            filteredArr = filteredArr.filter(
                (product: Product) =>
                    Number(product[key]) >= Number(minValue) && Number(product[key]) <= Number(maxValue)
            );
        });

        // exclusion-filters

        if (exclusionFilters.includes(ExclusionFiltersType.availableNow)) {
            filteredArr = filteredArr.filter(
                (product: Product) => product.availability === ExclusionFiltersType.availableNow
            );
        }
        if (exclusionFilters.includes(ExclusionFiltersType.comingSoon)) {
            filteredArr = filteredArr.filter(
                (product: Product) => product.availability === ExclusionFiltersType.comingSoon
            );
        }
        if (exclusionFilters.includes(ExclusionFiltersType.favorite)) {
            filteredArr = filteredArr.filter((product: Product) => product.isFavorite);
        }
        if (exclusionFilters.includes(ExclusionFiltersType.highRated)) {
            filteredArr = filteredArr.filter((product: Product) => Number(product.rating) >= HIGH_RATING_VALUE);
        }

        // complementary-filters
        if (!complementaryFilters.length) return filteredArr;
        let resultArr: Product[] = [];

        complementaryFilters.forEach((age: string) => {
            resultArr = resultArr.concat(
                filteredArr.filter((product: Product) => {
                    return product.ages === age;
                })
            );
        });
        return resultArr;
    }
}
