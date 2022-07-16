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

export enum SortingType {
    default = 'default',
    priceAscending = 'priceAscending',
    priceDescending = 'priceDescending',
    piecesAscending = 'piecesAscending',
    piecesDescending = 'piecesDescending',
}
