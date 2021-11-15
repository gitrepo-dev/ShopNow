import React from 'react'
import json from './db.json'
import Image from 'next/image'

export default function Posts() {
    return (
        <div className="container mx-auto px-5 md:px-10 mb-10 md:mb-20">
            <h1 className="text-sm sm:text-md text-gray-500 font-medium">Popular Item in the market</h1>
            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold">Latest News</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                  json.posts &&  json.posts.map((blog, index) => {
                        return (
                            <div key={index}>
                                <Image src={blog.url} height={300} width={350} layout="responsive" className="object-contain" />
                                <h1 className="text-lg font-medium">{blog.title}</h1>
                                <p className="text-gray-400 mt-5 font-md">{blog.des}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
