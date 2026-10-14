
import useToast from "@/hooks/use-toast"
import { addToCart } from "@/services/cart.service"
import { useAuthStoreUser } from "@/stores/auth-store"
import { Product } from "@/types/products.type"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { redirect } from "next/navigation"


const ProductCard = (props: Product) => {

    const user = useAuthStoreUser()
    const { id, mainImage, name, price, sku } = props
    const { createToast } = useToast()
    const queryClient = useQueryClient()

    const handleAddToCart = async (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (!user) {
            redirect('/login')
        }
        const result = await addToCart(id, 1)
        if (!result.res.ok) {
            createToast({ message: 'something went wrong , try again', type: 'error' })
            return
        }
        createToast({ message: 'Product added to cart successfully!', type: 'normal' })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
    }

    return (
        <Link href={`/products/${sku}`}>
            <div className="relative size-full bg-B text-text-A rounded-[20px] shadow-sm shadow-black/5 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]">
                {/* info + image */}
                <div className="p-1">
                    <div className="w-full h-25 lg:h-45 p-2 bg-A rounded-2xl">
                        <img className="size-full object-contain" src={mainImage} alt="" />
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