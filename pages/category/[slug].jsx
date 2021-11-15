import React from 'react'
import CategoryWiseProducts from '../../components/CategoryWiseProducts'

export default function category({ data }) {
    return (
        <>
            <CategoryWiseProducts data={data} />
        </>
    )
}


export async function getServerSideProps({ params: { slug } }) {
    const res = await fetch(`https://fakestoreapi.com/products/category/${slug}`)
    const json = await res.json()
    return {
        props: {
            data: json
        }
    }
}