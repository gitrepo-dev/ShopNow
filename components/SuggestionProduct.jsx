import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {CurrencyRupeeIcon} from '@heroicons/react/outline'

export default function SuggestionProduct({ data }) {
    return (
        <div className="container mx-auto my-20 px-5 lg:px-10 lg:px-20">
            <h1 className="text-gray-500 text-md font-medium">Popular Item in the market</h1>
            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold">Top Product</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-10 lg:mt-15">
                {
                    data && data.map((data, i) => {
                        return (
                            <Link href={`/product/${data.id}`} key={i}>
                                <a className="block relaive">
                                    <div className="shadow-md p-5">
                                        <div className="flex items-center">
                                            <span className="mr-2 inline-block img-responsive">
                                                <Image src={data.image} height={100} width={100} layout="responsive" className="object-contain" />
                                            </span>
                                            <span className="truncate">
                                                <h1 className="text-md font-medium mb-3">{data.title}</h1>
                                                <p className="text-primary text-lg font-medium truncate mt-3 text-gray-500 flex items-center"><CurrencyRupeeIcon height={17} className="mr-1" /> {data.price * 74}</p>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
