export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;

    technicalInfo: Record<string, string>;

    colors: string[];
    categories: string[];

    type: string;
    brand: string;

    price: string;
    offerPercent: number | null;
    salePrice: string | null;

    isFlashSale: boolean;
    stock: number;

    sku: string;

    rating: string;
    reviewCount: number;

    isActive: boolean;

    mainImage: string;
    subImages: string[];

    createdAt: string;
    updatedAt: string;
}

export interface ProductResponse {
    data: Product;
    message: string;
    status: number;
}

export interface ProductsResponse {
    data: Product[];
    message: string;

    page: number;
    nextPage: number | null;
    prevPage: number | null;

    totalPage: number;
    total: number;

    status: number;
}