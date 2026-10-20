export interface Product {
    id: string;
    tenantId: string;
    vendorId: string;
    sku: string;
    name: string;
    description: string;
    price: number;
    oldPrice: number;
    categoryId: string;
    brandId: string;
    attributes: Record<string, string>;
    images: string[];
    active: boolean;
    rating: number;
    reviewCount: number;
    version: number;
    available: number;
    updatedAt: string;
}

export interface ProductResponse {
    data: Product;
}

export interface ProductsResponse {
    data: {
        items: Product[];
        nextCursor: string | null;
        total: number;
    };
}


export interface WishlistResponse {
    data: WishlistItem[];
}

export interface WishlistItem {
    id: string;
    tenantId: string;
    userId: string;
    productId: string;
}