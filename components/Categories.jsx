import React from 'react'
import Image from 'next/image'

export default function Categories({ catalog }) {

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 px-10 sm:px-0 gap-4 mt-5 mb-20">
            {
                catalog && catalog.map((pro, i) => {
                    return (
                        <div key={i}>
                            <div className="block relative overflow-hidden bg-light h-full w-full group">
                                <Image src={pro.image} width={250} height={170} className="object-contain" layout="responsive" />
                                <div className="absolute group-hover:bg-[#eaeaead1] duration-300 w-full h-full bottom-0 ">
                                    <div className="bg-primary absolute opacity-0 -bottom-10 w-2/3 p-5 text-white group-hover:bottom-5 group-hover:opacity-100 duration-300">
                                        <h1 className="text-lg font-medium">{pro.category}</h1>
                                        <p className="text-sm truncate">{pro.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


