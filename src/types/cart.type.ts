export interface CartItem {
    productId: string;
    quantity: number;
}

export interface Cart {
    id: string;
    tenantId: string;
    userId: string;
    items: CartItem[];
    couponCode: string | null;
    version: number;
    updatedAt: string;
}

export interface CartResponse {
    data: Cart;
}