
import useToast from "@/hooks/use-toast"
import { addToCart } from "@/services/cart.service"
import { addToWishlist, deletefromWishlist, fetchProduct } from "@/services/products.service"
import { useAuthStoreUser } from "@/stores/auth-store"
import { Product, WishlistResponse } from "@/types/products.type"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface Prop {
    product: Product
    wishlistdata?: WishlistResponse
}

const ProductCard = ({ product, wishlistdata }: Prop) => {

    const user = useAuthStoreUser()
    const { id, images, name, price } = product
    const { createToast } = useToast()
    const queryClient = useQueryClient()
    const [isWish, setIsWish] = useState(false)

    useEffect(() => {
        if (wishlistdata) {
            setIsWish(wishlistdata.data.some(item => item.productId === product.id))
        }
    }, [wishlistdata])

    const handleAddToCart = async (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (!user) {
            redirect('/login')
        }

        const { data, res } = await fetchProduct(product.id)

        if (!res.ok) {
            createToast({ message: 'something went wrong , try again', type: 'error' })
            return
        }

        const stock = data.data.available

        if (stock === 0) {
            createToast({ message: 'Item is not available', type: 'error' })
            return
        }

        const result = await addToCart(id, 1)
        if (!result.res.ok) {
            createToast({ message: 'something went wrong , try again', type: 'error' })
            return
        }
        createToast({ message: 'Product added to cart successfully!', type: 'normal' })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
    }

    const toggleWishlist = async (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (!user) {
            redirect('/login')
        }
        if (isWish) {
            const { res } = await deletefromWishlist(product.id)
            if (!res.ok) {
                alert('failed')
                return
            }
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        } else {
            const { res } = await addToWishlist(product.id)
            if (!res.ok) {
                alert('failed')
                return
            }
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
        }
    }

    return (
        <Link href={`/products/${id}`}>
            <div className="relative size-full bg-B text-text-A rounded-[20px] shadow-sm shadow-black/5 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                {wishlistdata && <div className="absolute top-5 right-5">
                    <button onClick={toggleWishlist} className="btn btn-sm bg-rose-700 text-white">
                        {isWish ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                </div>}
                {/* info + image */}
                <div className="p-1">
                    <div className="w-full h-25 lg:h-45 p-2 bg-A rounded-2xl">
                        <img className="size-full object-contain" src={images[0]} alt="" />
                    </div>
                    <div className="w-full p-2">
                        {/* title */}
                        <h2 className="text-xs lg:text-[1rem] font-semibold line-clamp-2 h-8 lg:h-12">{name}</h2>
                        {/* price */}

                        <div className="flex items-center gap-3 mt-2 text-xs lg:text-[1rem]">
                            <span>${price}</span>
                        </div>

                        {/* rate */}
                        <div className="rating rating-xs my-2">
                            <div className="mask mask-star bg-orange-400" aria-label="1 star"></div>
                            <div className="mask mask-star bg-orange-400" aria-label="2 star"></div>
                            <div className="mask mask-star bg-orange-400" aria-label="3 star" ></div>
                            <div className="mask mask-star bg-orange-400" aria-label="4 star" aria-current="true" ></div>
                            <div className="mask mask-star bg-orange-400" aria-label="5 star"></div>
                        </div>
                    </div>
                </div>
                {/* cart button */}
                <button
                    onClick={(e) => handleAddToCart(e)}
                    className="w-full text-xs lg:text-[1rem] cursor-pointer flex justify-center bg-hover-effect text-white py-2.5">
                    Add To Cart
                </button>
            </div>
        </Link>
    )
}

export default ProductCard