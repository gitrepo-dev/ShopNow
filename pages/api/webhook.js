import { buffer } from 'micro'
import * as admin from 'firebase-admin'

// secure connection to firebase
const serviceAccount = require("../../permission.json");
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app()

// enable the stripe connection
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {

    return app.firestore().collection("users").doc(session.metadata.email)
        .collection("orders").doc(session.id).set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log(`successfully`)
        })
}

const removeFromCart = async () => {
    app.firestore().collection('cart').get().then(querySnapshot => {
        querySnapshot.docs.forEach(snapshot => {
            snapshot.ref.delete();
        })
    }).then(()=> console.log("Cart is clear successfully"))
}


export default async (req, res) => {

    if (req.method === "POST") {

        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString()
        const sig = req.headers['stripe-signature'];

        let event;

        // verify that event posted come from string
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            return res.status(400).send(`webhook error: 40 ${err.message}`)
        }

        // handle the checkout session complated event                           
        if (event.type === "checkout.session.completed") {

            const session = event.data.object;
            // fullfill the order
            return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) => res.status(400).send(`Webhook error: 53', ${err.message}`)),
                removeFromCart(session).then(() => res.status(200))
                    .catch((err) => res.status(400).send(`Webhook error: 54', ${err.message}`))
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}