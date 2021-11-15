import React from 'react'
import CartProductList from '../../components/CartProductList'
import ProductBanner from '../../components/ProductBanner'
import { useSession } from 'next-auth/client'

export default function Cart(props) {

    const [session] = useSession();
    return (
        <>
            <ProductBanner data={"Cart"} />
            <CartProductList />
        </>
    )
}
