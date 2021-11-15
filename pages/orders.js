import React from 'react'
import Image from 'next/image'
import { useSession, getSession } from 'next-auth/client'
import firebase from '../firebase'
import moment from 'moment'
import {CurrencyRupeeIcon} from '@heroicons/react/outline'

export default function Orders({ orders }) {

    const [session] = useSession();

    return (
        <div className="container mx-auto px-5 md:px-10">
            <div className="my-10 md:my-15">
                <h1 className="text-2xl font-bold border-b pb-5">Your orders</h1>
                <p className="font-medium text-md mb-10 pt-5">{orders && orders.length} Orders</p>
                <span className="text-md text-gray-600">{session && session.user.email && orders && orders.length === 0 ? <p>You have no items.</p> : ''}</span>
                {
                 session && session.user.email ? 

                    orders && orders.map((pro, i) => {
                        return (
                            <div key={i}>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100 p-5">
                                    <div>
                                        <p className="font-bold text-sm">ORDER PLACED</p>
                                        <p className="text-gray-600">{moment.unix(pro.timestamp).format("DD/MM/YYYY")}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">TOTAL</p>
                                        <p className="text-sm truncate mt-3 text-gray-500 flex items-center"><CurrencyRupeeIcon height={17} className="mr-1" /> {pro.amount}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">ITEMS</p>
                                        <p className="text-gray-600">{pro.item.length}</p>
                                    </div>
                                    <div className="break-words">
                                        <p className="font-bold text-sm">ORDER ID</p>
                                        <p className="text-gray-600 break-all">{pro.id}</p>
                                    </div>
                                </div>
                                <div className="sm:flex mb-10 mt-5">
                                    {
                                        pro.image.map((src, i) => {
                                            return (
                                                <span key={i} className="block sm:w-48 sm:mr-4 border p-3">
                                                    <Image src={src} height={340} width={340} layout="responsive" className="mb-5 object-contain" />
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }) : <p>Please sign in to see your orders</p>
                }
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    // get the user login details on serverside
    const session = await getSession(context);

    if (!session) {
        return {
            props: {}
        }
    }

    // fetch from the firebase your ordered products
    const stripeOrders = await firebase.firestore().collection("users").doc(session.user.email).collection("orders").orderBy('timestamp', 'desc').get();

    // stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            image: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            item: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 20,
                })
            ).data
        }))
    )

    return {
        props: {
            orders
        }
    }

}