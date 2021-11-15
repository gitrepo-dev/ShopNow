import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import firebase from '../firebase'
import { useSession } from 'next-auth/client'
import { loadStripe } from '@stripe/stripe-js'
import {CurrencyRupeeIcon} from '@heroicons/react/outline'
const stripePromise = loadStripe(process.env.stripe_publice_key)

export default function CartProductList() {

    // auth
    const [session] = useSession()

    // fetch all product form firebase
    const [count, setCount] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => {
        const product = []
        const res = firebase.firestore().collection('cart').onSnapshot((snap) => {
            snap.docs.forEach(data => {
                const proId = data["proId"] = data.id
                const obj = { ...data.data(), proId }
                product.push(obj)
            })
            setProducts(product)
        });
        return () => setProducts([])
    }, [count])

    // remove from cart
    const removeFromCart = (id) => {
        try {
            firebase.firestore().collection('cart').doc(id).delete();
        }
        catch (error) {
            console.error("Error removing from cart: ", error);
        };
    }

    // get real time data from wishlist collection to get the num of cart products
    const res = firebase.firestore().collection('cart');
    res.onSnapshot(({ docs }) => {
        setCount(docs.length);
    });

    // subtotal 
    let subTotal = 0
    products && products.map(({ price }) => {
        subTotal = subTotal + price
    })


    // checkout session
    const createCheckOutSession = async () => {
        const stripe = await stripePromise;
        const res = await fetch('/api/checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products,
                email: session.user.email
            })
        })

        const json = await res.json();

        const result = await stripe.redirectToCheckout({
            sessionId: json.id
        })

        if (result.error) {
            alert(result.error.message)
        }
    }

    return (
        <div className="container mx-auto md:my-10 lg:my-20 md:px-10 lg:px-15">
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    {

                        products && products.map((pro, i) => {
                            return (
                                <div className="block relative w-full mb-5 md:mb-10 border p-5 md:p-8" key={i}>

                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        <Link href={`/product/${pro.id}`}>
                                            <a>
                                                <Image src={pro.image} width={150} height={150} layout="responsive" className="object-contain" />
                                            </a>
                                        </Link>
                                        <span className="flex items-center">
                                            <span>
                                                <Link href={`/product/${pro.id}`}>
                                                    <a className="block relative">
                                                        <h1 className="text-lg font-medium mb-3">{pro.title}</h1>
                                                    </a>
                                                </Link>
                                                <p className="text-sm text-gray-400 mb-3">{pro.description}</p>
                                                <p className="text-sm truncate mt-3 text-gray-500 flex items-center font-bold"><CurrencyRupeeIcon height={17} className="mr-1" /> {pro.price * 74}</p>
                                            </span>
                                        </span>
                                        <span className="flex items-center">
                                            <span className="text-center">
                                                <button className="mt-7 font-sm font-medium text-white bg-primary px-6 py-2 rounded-full border-2 border-primary hover:bg-white hover:text-primary delay-100" onClick={() => removeFromCart(pro.proId)}>Remove from cart</button>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="border p-10 text-center">
                    {
                        subTotal && subTotal !== 0 ?
                            (
                                <>
                                    <p className="font-medium">Item: {products && products.length} </p>
                                    <h1 className="text-lg font-medium">
                                        SubTotal: &#8377; {subTotal * 74}
                                    </h1>
                                </>
                            ) : ""
                    }

                    {
                        products && products.length === 0 ? <p>No item in cart</p>
                        : session === undefined || session === null ? <p className="text-dark text-white mt-5 rounded-full font-medium h5 bg-gray-500 inline-block px-5 py-3">Signin to checkout</p> : subTotal === 0 ? '' : <button className="mt-7 font-sm font-medium text-white bg-primary px-6 py-2 rounded-full border-2 border-primary hover:bg-white hover:text-primary delay-100" onClick={() => createCheckOutSession()}>Checkout</button>
                    }
                </div>
            </div>
        </div >
    )
}
