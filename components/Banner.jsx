import React from 'react'
import Image from 'next/image'

export default function Banner() {
    return (
        <div className="">
            <div className="flex">
                <div className="hidden md:block bg-primary w-3/5 h-96 md:b-h lg:h-banner">
                    <div className="relative h-full w-full">
                        <div className="img-banner absolute bottom-0 right-0">
                            <Image src="/banner.jpg" width={400} height={550} />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-700 w-full  h-96 md:b-h lg:h-banner bg-light flex align-items-center">
                    <div className="w-2/3 sm:w-full px-5 sm:px-10 md:px-20 md:w-4/5 md:mx-auto flex items-center">
                        <div>
                            <h1 className="text-md sm:text-lg lg:text-3xl text-gray-400 mb-4">Shop is fun</h1>
                            <h1 className="text-lg sm:text-3xl lg:text-5xl mb-2 sm:mb-3 font-medium">BROWSE OUR</h1>
                            <h1 className="text-lg sm:text-3xl lg:text-5xl mb-4 font-medium">PREMIUM PRODUCT</h1>
                            <p className="text-sm md:text-md text-gray-400">Us which over of signs divide dominion deep fill bring they are meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.</p>
                            <button className="mt-7 px-3 md:px-6 py-2 sm:py-2.5 font-medium text-sm sm:text-md text-white bg-primary rounded-full border-2 border-primary hover:bg-white transition duration-75 ease-in-out hover:text-primary">Browse Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
