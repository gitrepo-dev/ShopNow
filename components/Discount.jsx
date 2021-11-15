import React from 'react'

export default function Discount() {

    const imgUrl = "https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=50"

    return (
        <div className="h-72 md:h-82 lg:h-96 mb-20 bg-cover bg-right bg-fixed bg-gray-500" style={{ backgroundImage: `url(${imgUrl})` }} >
            <div className="container mx-auto px-5 md:px-50 lg:p-100 h-full">
                <div className="text-white flex items-center justify-center pl-50 text-center h-full w-100">
                    <div>
                        <h1 className="font-medium text-lg sm:text-2xl md:text-4xl">Up To 50% Off</h1>
                        <h1 className="my-4 font-medium text-md sm:text-2xl md:text-3xl">Winter Sale</h1>
                        <p className="text-white">Him she do let them sixth saw light</p>
                        <button className="mt-7 px-4 sm:px-6 py-2 sm:py-2.5 font-medium text-white bg-primary rounded-full border-2 border-primary hover:bg-white transition duration-75 ease-in-out hover:text-primary text-sm sm:text-md">Shop Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
