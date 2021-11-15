import React from 'react'
import Link from 'next/link'

export default function success() {
    return (
        <>
            <div className='h-96 w-full flex items-center justify-center'>
                <div className="text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl mb-5 font-bold">Thank you for shopping</h1>
                    <p className="text-green-600 font-medium mb-5 d-block">Your payment has been successfull !!!</p>
                    <Link href="/orders">
                        <a className="mt-7 font-sm font-medium text-white bg-green-600 px-6 py-2 rounded-full border-2 border-green hover:bg-white hover:text-green-600 delay-100"> Go to order page</a>
                    </Link>
                </div>
            </div>
        </>
    )
}
