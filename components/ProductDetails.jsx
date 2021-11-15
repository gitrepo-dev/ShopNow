import React from 'react'
import Image from 'next/image'
import firebase from '../firebase'
import {CurrencyRupeeIcon} from '@heroicons/react/outline'

export default function ProductDetails({ data }) {

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

    return (
        <div className="container mx-auto my-20 px-5 lg:px-10 lg:px-20">
            <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-gray-100 p-10">
                    <Image src={data.image} height={300} width={300} layout="responsive" className="object-contain" />
                </div>
                <div className="md:p-10 lg:p-20">
                    <h1 className="text-2xl mb-3 font-medium">{data.title}</h1>

                    <p className="text-primary text-lg font-medium truncate mt-3 text-gray-500 flex items-center"><CurrencyRupeeIcon height={17} className="mr-1" /> {data.price * 74}</p>
                    <p className="text-md text-gray-500 my-3 pb-5 border-gray-300 border-b-2"><span className="font-medium">Category: </span>{data.category}</p>
                    <p className="text-gray-500 mt-5">{data.description}</p>
                    {/* <input type="number" placeholder="Quantity" min={1} max={10} className="px-6 py-2 rounded-full border-2 border-gray-300 mr-5 w-36 focus:outline-none" /> */}
                    <button className="mt-7 font-sm font-medium text-white bg-primary px-6 py-2 rounded-full border-2 border-primary hover:bg-white hover:text-primary delay-100" onClick={()=>addToBasket(data)}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}
