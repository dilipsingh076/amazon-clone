/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
const functions = require('firebase-functions')
const cors = require('cors')
const logger = require("firebase-functions/logger");
const express = require('express')

const stripe = require('stripe')('sk_test_51NEdDCSChJIakx4PCvq0ZicuSXNIgoqscQP1J3R1xePuBnTLunX3H4BXWBMS2iWKf3gntp21jhB778yJLEaJBVHq00CtVWWMe0')


// Api



// Api config
const app = express();



// Middlewares
app.use(cors({origin:true}));
app.use(express.json());





// Api routes
app.get('/',(req,res)=> res.status(200).send("hello dilip working."))

app.post("/payments/create", async (req, res) => {
    console.log("req",req)
    const total = req.query.total;
  
    console.log(total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });


// Listencommand

exports.api = functions.https.onRequest(app)

// example endpoint which i get from the firebase when i run the command npx firebase emulator:start
// http://localhost:5001/e-clone-7f6a3/us-central1/api
// app.listen(5000)




// by using this command we can deploy our backend on firebaes server the command is 
// firebase deploy --only functions






































// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
