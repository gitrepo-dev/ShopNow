import React from 'react'
import ProductBanner from '../../components/ProductBanner'
import ProductDetails from '../../components/ProductDetails'
import SuggestionProduct from '../../components/SuggestionProduct'

export default function productDetails({ product, productList }) {
    return (
        <>
            <ProductBanner data={"Single Shop"} />
            <ProductDetails data={product} />
            <SuggestionProduct data={productList} />
        </>
    )
}


export async function getServerSideProps({ params: { id } }) {

    const [product, productList] = await Promise.all([

        // fetch product by id
        fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "GET",
            headers: { "Context-Type": "application/json" }
        }).then(data => data.json()),

        // fetch all products
        fetch(`https://fakestoreapi.com/products?limit=9`, {
            method: "GET",
            headers: { "Context-Type": "application/json" }
        }).then(data => data.json())
    ])
    return {
        props: {
            product,
            productList
        }
    }
}