import { ProductResponse, ProductsResponse, WishlistResponse } from "@/types/products.type";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

export const fetchProducts = async ({ cursor = 0, limit = 20, q = '', queries = '' }) => {
    try {
        const res = await fetch(`${apiBaseUrl}/products?q=${q}&cursor=${cursor}&limit=${limit}&${queries}`);
        const data: ProductsResponse = await res.json();
        return { data, res };
    } catch (err) {
        console.log('Error => ', err);
        throw err
    }

};

export const fetchProduct = async (id: string) => {
    try {
        const res = await fetch(`${apiBaseUrl}/products/${id}`);
        const data: ProductResponse = await res.json();
        return { data, res };
    } catch (err) {
        console.log('Error => ', err);
        throw err
    }

};

export const fetchwishlists = async () => {
    try {

        const token = localStorage.getItem('accessToken')

        const res = await fetch(`${apiBaseUrl}/wishlist`,
            {
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }
        );
        const data: WishlistResponse = await res.json();
        return { data, res };
    } catch (err) {
        console.log('Error => ', err);
        throw err
    }

};

export const addToWishlist = async (id: string) => {

    try {

        const token = localStorage.getItem('accessToken')

        const res = await fetch(`${apiBaseUrl}/wishlist/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({})
        });

        const data = await res.json();
        return { data, res };

    } catch (err) {

        console.log('Error => ', err);
        throw err

    }

};

export const deletefromWishlist = async (id: string) => {
    try {

        const token = localStorage.getItem('accessToken')

        const res = await fetch(`${apiBaseUrl}/wishlist/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        return { res };

    } catch (err) {

        console.log('Error => ', err);
        throw err

    }

};