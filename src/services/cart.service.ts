import { Cart, CartResponse } from "@/types/cart.type";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

export const fetchCart = async () => {
    try {
        const token = localStorage.getItem('accessToken')
        const res = await fetch(`${apiBaseUrl}/cart`, {
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data: CartResponse = await res.json();
        return { data, res };
    } catch (err) {
        console.log('Error => ', err);
        throw err
    }
};


export const addToCart = async (productId: string, quantity: number) => {

    try {

        const token = localStorage.getItem('accessToken')

        const cartBody = { productId, quantity }

        const res = await fetch(`${apiBaseUrl}/cart/items`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(cartBody)
        })

        const data = await res.json();
        return { data, res };

    } catch (err) {

        console.log('Error => ', err);
        throw err

    }
};

export const editCartItem = async (itemID: string, quantity: number) => {

    try {

        const token = localStorage.getItem('accessToken')

        const body = { quantity }

        const res = await fetch(`${apiBaseUrl}/cart/items/${itemID}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return { data, res };

    } catch (err) {

        console.log('Error => ', err);
        throw err

    }
};

export const clearCart = async () => {

    try {

        const token = localStorage.getItem('accessToken')

        const res = await fetch(`${apiBaseUrl}/cart/items`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return { res };

    } catch (err) {

        console.log('Error => ', err);
        throw err

    }

};

export const deleteCartItem = async (id: string) => {

    try {
        const token = localStorage.getItem('accessToken')
        const res = await fetch(`${apiBaseUrl}/cart/items/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        return { data, res };

    } catch (err) {

        console.log('Error => ', err);
        throw err

    }
};
