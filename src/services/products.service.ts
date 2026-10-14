import { ProductResponse, ProductsResponse } from "@/types/products.type";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

export const fetchProducts = async (page: number = 1, limit: number = 40, queries: string = '') => {
    try {
        const res = await fetch(`${apiBaseUrl}/products?page=${page}&limit=${limit}&${queries}`);
        const data: ProductsResponse = await res.json();
        return { data, res };
    } catch (err) {
        console.log('Error => ', err);
        throw err
    }

};

export const fetchProduct = async (sku: string) => {
    try {
        const res = await fetch(`${apiBaseUrl}/products/${sku}`);
        const data: ProductResponse = await res.json();
        return { data, res };
    } catch (err) {
        console.log('Error => ', err);
        throw err
    }

};