import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import firebase from '../../firebase'
import {CurrencyRupeeIcon} from '@heroicons/react/outline'

export default function Wish() {

    // fetch all product form firebase
    const [count, setCount] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => {
        const product = []
        const res = firebase.firestore().collection('wishlist').onSnapshot((snap) => {
            snap.docs.forEach(data => {
                const proId = data["proId"] = data.id
                const obj = { ...data.data(), proId }
                product.push(obj)
            })
            setProducts(product)
        });
        return () => setProducts([])
    }, [count])

    // get product lenght of wishlist
    const res = firebase.firestore().collection('wishlist');
    res.onSnapshot(({ docs }) => {
        setCount(docs.length);
    });

    // add cart product in firestore
    const addToBasket = (item, id) => {
        console.log(id)
        try {
            const res = firebase.firestore().collection("cart").where("id", "==", item.id);
            res.get().then((doc) => {
                console.log(doc)
                if (!doc.empty) {
                    alert("This item already in your cart !!!")
                } else {
                    // firebase.firestore().collection('wishlist').doc(id).delete()
                    firebase.firestore().collection("cart").doc().set(item)

                }
            })
        } catch (error) {
            console.log("add to basket:", error);
        };
    }

    // remove from wishlist
    const removeFromWishList = (id) => {
        try {
            firebase.firestore().collection('wishlist').doc(id).delete()
        }
        catch (error) {
            console.error("Error removing from wishlist: ", error);
        };
    }


    return (
        <>
            <div className="container mx-auto px-10 lg:px-20 my-10 md:my-15">
                <h1 className="text-lg mb-10 font-medium">Your Wishlist</h1>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {
                        products && products.map((pro, i) => {
                            return (
                                <div className="shadow-md border p-5 mb-10 relative h-full" key={i}>
                                    <Image src={pro.image} width={300} height={300} layout="responsive" className="object-contain my-3" />
                                    <h1 className='text-lg font-medium'>{pro.title}</h1>
                                    <p className="text-sm truncate my-3 text-gray-500 flex items-center"><CurrencyRupeeIcon height={17} className="mr-1" /> {pro.price * 74}</p>
                                    <p className="text-sm text-gray-600">{pro.description}</p>
                                    <div className="mt-5 absolute bottom-0 py-3 px-5 w-full left-0">
                                        <div className="relative bottom-0 w-full flex items-center justify-between h-full">
                                            <span className="bg-red-700 px-5 py-2 text-white hover:bg-white hover:text-red-700 duration-300 border-2 cursor-pointer text-sm" onClick={() => addToBasket(pro, pro.proId)}>Add to cart</span>
                                            <span className="bg-primary px-5 py-2 text-white hover:bg-white hover:text-primary duration-300 border-2 cursor-pointer text-sm" onClick={() => removeFromWishList(pro.proId)}>Remove</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
