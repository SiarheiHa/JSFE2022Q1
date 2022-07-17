import { FavoriteListModel, Product } from '../../interfaces';

export class FavoriteList implements FavoriteListModel {
    constructor(private products: Product[]) {
        this.products = products;
    }

    private getFavorites(): string[] {
        return (JSON.parse(localStorage.getItem('favorites') as string) as string[]) || [];
    }

    public clearFavoriteList(): void {
        localStorage.removeItem('favorites');
        this.products.forEach((product: Product) => (product.isFavorite = false));
    }

    private addFavorite(productID: number): void {
        const favorites: string[] = this.getFavorites();
        favorites.push(String(productID));
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    private deleteFavorite(productID: number): void {
        const favorites: string[] = this.getFavorites().filter((product) => product !== String(productID));
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    public isIdInFavoriteList(productID: number): boolean {
        return this.getFavorites().includes(String(productID));
    }

    public toggleFavoriteStatus(productID: number): void {
        const product: Product | undefined = this.getProductByID(productID);
        if (product) {
            product.isFavorite ? this.deleteFavorite(productID) : this.addFavorite(productID);
            product.isFavorite = !product.isFavorite;
        }
    }

    private getProductByID(productID: number): Product | undefined {
        return this.products.find((product) => product.item_id === productID);
    }
}
