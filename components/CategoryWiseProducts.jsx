import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import firebase from '../firebase'
import { ShoppingCartIcon, HeartIcon, CurrencyRupeeIcon } from '@heroicons/react/outline'

export default function CategoryWiseProducts({ data }) {

    // add cart product in firestore
    const addToBasket = (item) => {
        try {
            const res = firebase.firestore().collection("cart").where("id", "==", item.id);
            res.get().then(function (doc) {
                if (!doc.empty) {
                    alert("This item already in your cart !!!")
                } else {
                    firebase.firestore().collection("cart").doc().set(item)
                }
            })
        } catch (error) {
            console.log("add to basket:", error);
        };
    }

    // add wishlist product in firestore
    const addToWishlist = (item) => {
        try {
            const res = firebase.firestore().collection("wishlist").where("id", "==", item.id);
            res.get().then(function (doc) {
                if (!doc.empty) {
                    alert("This item already in your wishlist !!!")
                } else {
                    firebase.firestore().collection("wishlist").doc().set(item)
                }
            })
        } catch (error) {
            console.log("add to wishlist:", error);
        };
    }

    return (
        <div className="container mx-auto px-5 md:px-10 my-10 md:my-20">
            <h1 className="text-gray-500 text-md font-medium">Popular Item in the market</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
                {
                    data && data.map((pro, index) => {
                        return (
                            <div key={index} className="relative group overflow-hidden">
                                <Link href={`/product/${pro.id}`}>
                                    <a className="block">
                                        <div className="bg-light relative ">
                                            <Image src={pro.image} width={250} height={250} className="object-contain" layout="responsive" />
                                        </div>
                                        <div className="p-4 text-center">
                                            <h1 className="text-lg font-medium text-gray-500 capitalize">{pro.category}</h1>
                                            <p className="text-sm truncate">{pro.title}</p>
                                            <p className="text-sm truncate mt-3 text-gray-500 flex justify-center items-center"><CurrencyRupeeIcon height={17} className="mr-1" /> {pro.price * 74}</p>
                                        </div>
                                    </a>

                                </Link>
                                {/* box */}
                                <div className="bg-gray-200 absolute group-hover:bottom-100 bottom-10 opacity-0 group-hover:opacity-100 duration-300 w-full p-5">
                                    <div className="flex justify-center">
                                        <span className="bg-primary p-2 mr-5 hover:opacity-100 opacity-70 transition-1 cursor-pointer">
                                            <ShoppingCartIcon className="h-5 text-white" onClick={() => addToBasket(pro)} />
                                        </span>
                                        <span className="bg-primary p-2 hover:opacity-100 opacity-70 transition-1 cursor-pointer">
                                            <HeartIcon onClick={() => addToWishlist(pro)} className="h-5 text-white" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
