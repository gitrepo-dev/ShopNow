import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LocationMarkerIcon, PhoneIcon, MailIcon } from '@heroicons/react/outline'

export default function Footer() {

    const [categories, setCategories] = useState([]);
    // get all categories
    useEffect(() => {
        // get product by categories
        fetch(`https://fakestoreapi.com/products/categories`).then(foores => foores.json())
            .then(data => {
                setCategories(data)
            })
    }, [categories.length])

    return (
        <div className="bg-gray-900">
            <div className="container mx-auto p-5 md:p-10 lg:p-20">
                <div className="grid grid-6 gap-5 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-15 lg:grid-cols-4 sm:gap-20">
                    <span>
                        <h1 className="text-lg text-white font-bold mb-4">About us</h1>
                        <span className="text-gray-300">
                            <p className="mb-4">So seed seed green that winged cattle in. Gathering thing made fly you are no divided deep moved us lan Gathering thing us land years living</p>
                            <p>So seed seed green that winged cattle in.</p>
                        </span>
                    </span>
                    <span>
                        <h1 className="text-lg text-white font-bold mb-4">Categories</h1>
                        <ul className="list-none">
                            {
                                categories && categories.map((cat, index) => {
                                    {
                                        return (
                                            <Link href={`/category/${cat.toLowerCase().replaceAll(' ', '%20')}`} key={index}>
                                                <a className="block mb-3">
                                                    <li key={index} className="hover:text-primary  cursor-pointer text-gray-300 mr-2 capitalize font-medium text-md">{cat}</li>
                                                </a>
                                            </Link>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </span>
                    <span>
                        <h1 className="text-lg text-white font-bold mb-4">Gallery</h1>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://images.unsplash.com/photo-1432712641917-22ce322ab531?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=50" className="object-contain" width={100} height={100} layout="responsive" />
                            <Image src="https://images.unsplash.com/photo-1558171813-2ffcb3d2ea27?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGNsb3Roc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60" className="object-contain" width={100} height={100} layout="responsive" />
                            <Image src="https://images.unsplash.com/photo-1544261480-9f3c8c9859be?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60" className="object-contain" width={100} height={100} layout="responsive" />
                            <Image src="https://images.unsplash.com/photo-1517836034914-40ef8d668510?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3Roc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60" className="object-contain" width={100} height={100} layout="responsive" />
                        </div>
                    </span>
                    <span>
                        <h1 className="text-lg text-white font-bold mb-4">Contact Us</h1>
                        <ul className="list-none text-gray-300">
                            <li className="flex items-start mb-7">
                                <span className="bg-primary p-2 inline-block rounded-full">
                                    <LocationMarkerIcon className="text-white h-5" />
                                </span>
                                <span className="inine-block ml-3">
                                    <h1 className="text-white font-medium"> Head Office</h1>
                                    <p className="text-gray-300">123, Main Street, Your City</p>
                                </span>
                            </li>
                            <li className="flex items-start mb-7">
                                <span className="bg-primary p-2 inline-block rounded-full">
                                    <PhoneIcon className="text-white h-5" />
                                </span>
                                <span className="inine-block ml-3">
                                    <h1 className="text-white font-medium"> Phone Number

                                    </h1>
                                    <p className="text-gray-300">+91 9988556677</p>
                                </span>
                            </li>
                            <li className="flex items-start mb-7">
                                <span className="bg-primary p-2 inline-block rounded-full">
                                    <MailIcon className="text-white h-5" />
                                </span>
                                <span className="inine-block ml-3">
                                    <h1 className="text-white font-medium"> Email

                                    </h1>
                                    <p className="text-gray-300">abc@gmail.com</p>
                                </span>
                            </li>
                        </ul>
                    </span>
                </div>
            </div>
        </div>
    )
}
