import { Product } from "./products.type";

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

export interface Cart {
    id: number;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
    totalPrice: number;
}
