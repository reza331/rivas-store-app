import { Cart } from "@/types/cart.type";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

export const fetchCart = async () => {
    try {
        const res = await fetch(`${apiBaseUrl}/cart`, {
            credentials: 'include',
        });
        const data: Cart = await res.json();
        return { data, res };
    } catch (err) {
        console.log('Error => ', err);
        throw err
    }
};


export const addToCart = async (productId: number, quantity: number) => {

    try {

        const cartBody = { productId, quantity }

        const res = await fetch(`${apiBaseUrl}/cart/items`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartBody)
        })

        const data = await res.json();
        return { data, res };

    } catch (err) {

        console.log('Error => ', err);
        throw err

    }
};

export const editCartItem = async (itemID: number, quantity: number) => {

    try {

        const body = { quantity }

        const res = await fetch(`${apiBaseUrl}/cart/items/${itemID}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
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

        const res = await fetch(`${apiBaseUrl}/cart/items`, {
            method: 'DELETE',
            credentials: 'include',
        });

        return { res };

    } catch (err) {

        console.log('Error => ', err);
        throw err

    }

};

export const deleteCartItem = async (id: number) => {

    try {

        const res = await fetch(`${apiBaseUrl}/cart/items/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        const data = await res.json();
        return { data, res };

    } catch (err) {

        console.log('Error => ', err);
        throw err

    }
};
