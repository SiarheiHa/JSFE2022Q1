export interface ProductResponseObj {
    _id: string;
    set: string;
    item_id: number;
    reviews: number | null;
    rating: string;
    availability: string;
    price: number;
    images: string[];
    ages: string;
    pieces: number;
    __v: number;
}

export interface Product extends ProductResponseObj {
    isFavorite: boolean;
    isInCart: boolean;
}

export enum ExclusionFiltersType {
    availableNow = 'Available now',
    comingSoon = 'Coming Soon',
    highRated = 'High Rated',
    favorite = 'Favorite',
}

export enum FilterType {
    exclusion = 'exclusion-filters',
    complementary = 'complementary-filters',
}

export enum SortingType {
    default = 'default',
    priceAscending = 'priceAscending',
    priceDescending = 'priceDescending',
    piecesAscending = 'piecesAscending',
    piecesDescending = 'piecesDescending',
}

export interface ModalModel {
    buildModal(message: string): void;
}

export interface SliderModel {
    drawSlider(slider: HTMLElement, valueFrom: number, ValueTo: number, maxValue: number): void;
    resetSliders(): void;
}

export interface ViewModel {
    modal: ModalModel;
    slider: SliderModel;
    drawProducts(products: Product[]): void;
    drawCartCounter(countOfProducts: number): void;
    checkCheckboxes(sort: SortingType, filters: string[]): void;
    toggleClassActive(target: HTMLElement): void;
}

export type ResultOfToggleCartStatus = {
    status: 'ok' | 'rejected';
    message: string;
};

export interface ShopAppModel {
    start(): void;
}

export interface SortingModel {
    setSort(type: SortingType): void;
    getSort(): SortingType;
    sortProducts(productsArr: Product[]): Product[];
}

export interface FiltersModel {
    getFilters(filterType: string): string[];
    addFilter(filterType: string, value: string): void;
    setFiltersValue(filterType: string, value: string, isChecked: boolean): void;
    resetFilters(): void;
    filterProducts(productsArr: Product[]): Product[];
}

export interface SearchModel {
    searchValue: string;
    filterBySearch(productsArr: Product[]): Product[];
}

export interface FavoriteListModel {
    clearFavoriteList(): void;
    isIdInFavoriteList(productID: number): boolean;
    toggleFavoriteStatus(productID: number): void;
}

export interface CartModel {
    cartCounter: number;
    toggleCartStatus(productID: number): ResultOfToggleCartStatus;
    isIdInCartList(productID: number): boolean;
    clearCart(): void;
}
