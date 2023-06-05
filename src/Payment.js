import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import axios from './axios'
import CheckoutProduct from './CheckoutProduct'
import { useNavigate } from 'react-router-dom'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import { db } from './firebase'
export default function Payment() {
    const navigate = useNavigate()
    const [state, dispatch] = useStateValue()
    const stripe = useStripe();
    const elements = useElements()

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')

    console.log("user info", state.user?.uid)
    useEffect(() => {
        // genrate the special stripe secret which allows us to chage a custoer 

        const getClientSecret = async () => {
            const response = await axios({
                method: 'POST',
                url: `/payments/create?total=${getBasketTotal(state.basket) * 100}`
            });
            console.log("response lclinet",response)
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()

    }, [state.basket]);

    console.log("the secret is >>>", clientSecret)

    const handleSubmit = async (e) => {
        // do all fancy stripe stuff here.
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then((res) => {
            // paymentIntent = payment confirmation 
            console.log("paymentintent",res)
            db.collection('users')
                .doc(state.user?.uid)
                .collection('orders')
                .doc(res.error.payment_intent?.id)
                .set({
                    basket: state.basket,
                    amount: res.error.payment_intent?.amount,
                    created: res.error.payment_intent?.created
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_BASKET'
            })
            navigate("/orders")
        })


    }
    const handleChange = (e) => {
        //  listedn form changs in the card element
        // and display any errors as thecustomer types their card etails.
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "");


    }
    return (
        <div className='payment' >
            <div className='payment_container' >
                <h1 onClick={() => navigate('/checkout')} >Checkout {state.basket.length}items </h1>
                {/* payment section - delivery address */}
                <div className='payment_section' >
                    <div className='payment_title' >
                        <h3>Delivery address</h3>
                    </div>
                    <div className='payment_address' >
                        <p> {state.user?.email} </p>
                        <p> tilak nagar </p>
                        <p> Hiradas bharatpur </p>
                    </div>
                </div>
                {/* payment section - Review Item  */}
                <div className='payment_section' >
                    <div className='paymet_title' >
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items' >
                        {
                            state.basket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))
                        }
                    </div>
                </div>
                {/* payment section - Payment method */}
                <div className='payment_section' >
                    <div className='payment.title' >
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details' >
                        {/* stripe magic will go */}
                        <form onSubmit={handleSubmit} >
                            <CardElement onChange={handleChange} />
                            <div className='payment_priceContainer' >
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total : {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(state.basket)}
                                    displayType='text'
                                    thousandSeparator={true}
                                    prefix='$'
                                />
                                <button disabled={processing || disabled || succeeded} >
                                    <span> {processing ? <p>Processing</p> : "Buy Now"} </span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
