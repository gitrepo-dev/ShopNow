import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import firebase from '../firebase'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartIcon, UserIcon, HeartIcon } from '@heroicons/react/outline'

export default function Navigation() {

    const [session] = useSession()
    const [categories, setCategories] = useState([])
    const [cartCount, setCartCount] = useState('')
    const [wishCount, setWishCount] = useState('')

    // get all categories
    useEffect(() => {
        // get product by categories
       const res = fetch(`https://fakestoreapi.com/products/categories`).then(navres => navres.json())
            .then(data => {
                setCategories(data)
            })
            
        // return () => setCategories([])
    }, [categories.length])

    // get real time data from cart collection to get the num of cart products
    const res = firebase.firestore().collection('cart');
    res.onSnapshot(({ docs }) => {
        setCartCount(docs.length);
    });

    // get real time data from wish list collection to get the num of cart products
    const res2 = firebase.firestore().collection('wishlist');
    res2.onSnapshot(({ docs }) => {
        setWishCount(docs.length);
    });

    return (
        <div className="shadow-sm md:sticky top-0 bg-white z-10">
            <div className="container mx-auto px-3 md:px-5 lg:px-7 py-4 md:py-4">
                <div className="flex justify-between sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <Link href="/">
                        <a className="flex items-center">
                            <span className="">
                                <Image src="/logo.png" width={32} height={32} className="mr-3 object-contain" />
                            </span>
                            <span className="text-md ml-1 sm:text-2xl text-black font-medium sm:ml-2">AMZ</span>
                        </a>
                    </Link>

                    <ul className="sm:col-span-2 list-none hidden lg:flex items-center justify-between">
                        {
                            categories && categories.map((cat, index) => {
                                return (
                                    <Link href={`/category/${cat.toLowerCase().replaceAll(' ', '%20')}`} key={index}>
                                        <a className="inline-block">
                                            <li key={index} className="hover:text-primary  cursor-pointer text-gray-700 mr-2 capitalize font-medium text-sm">{cat}</li>
                                        </a>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                    <div className="flex items-center justify-end">
                        <div className="mr-4 sm:mr-6 relative group">
                            <span className="cursor-pointer font-medium" onClick={!session ? signIn : signOut}>
                                {session
                                    ? <div className="flex items-center hover:text-primary">
                                        {session.user.image && session.user.image ?
                                            <span className="h-8 w-8 inline-block mr-3">
                                                <Image src={`${session.user.image && session.user.image}`} height={50} width={50} layout="responsive" className="rounded-full" />
                                            </span> : "Hi"}
                                        {session.user.name}
                                    </div>
                                    : <a className="inline-block text-center">
                                        <UserIcon className="h-5 group-hover:text-primary duration-100 mx-auto" />
                                        <span className="font-medium text-sm group-hover:text-primary">Sign in</span>
                                    </a>}
                            </span>
                        </div>
                        <div className="mr-4 sm:mr-6 relative group">
                            <Link href="/products/cart">
                                <a>
                                    <ShoppingCartIcon className="h-5 group-hover:text-primary duration-100" />
                                    <span className="absolute bottom-3 left-2 sm:left-3 bg-primary rounded-full h-5 w-5 text-white text-sm flex justify-center items-center group-hover:bg-black duration-100">{cartCount}</span>
                                </a>
                            </Link>
                        </div>
                        <div className="sm:mr-2 relative group">
                            <Link href="/products/wishlist">
                                <a>
                                    <HeartIcon className="h-5 group-hover:text-primary duration-100" />
                                    <span className="absolute bottom-3 left-2 sm:left-3 bg-red-600 rounded-full h-5 w-5 text-white text-sm flex justify-center items-center group-hover:bg-black duration-100">{wishCount}</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
