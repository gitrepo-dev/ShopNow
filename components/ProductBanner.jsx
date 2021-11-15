import React from 'react'
import Link from 'next/link'

export default function ProductBanner({data}) {

    return (
        <div className="h-40 sm:56 lg:h-60 bg-gray-100 text-black w-full flex items-center justify-center" >
            <div className="text-center">
                <h1 className="text-lg sm:text-3xl mb-2 font-medium">{data}</h1>
                <Link href="/"><a className="text-gray-500 hover:text-primary">Home</a></Link>
            </div>
        </div>
    )
}
