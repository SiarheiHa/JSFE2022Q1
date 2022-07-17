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

export interface ResultOfToggleCartStatus {
    status: 'ok' | 'rejected';
    message: string;
}

export interface ShopAppModel {
    start(): void;
}
