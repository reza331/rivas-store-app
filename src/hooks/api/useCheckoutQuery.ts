import { checkoutQ } from '@/services/payment-order.service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function useCheckoutQuery() {
    return useQuery({
        queryKey: ['checkout'],
        queryFn: () => checkoutQ()
    })
}
