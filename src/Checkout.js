import React, { useState } from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
export default function Checkout() {
  const [state,dispatch] = useStateValue()
  return (
    <>
    <div className='checkout' >
      <div className='checkout_left' >
        <img className='checkout_ad' src='https://www.shutterstock.com/image-vector/credit-card-advertising-vector-illustration-260nw-740608930.jpg' />

        <div>
          <h3>Hello, {state.user?.email}</h3>
          <h2 className='checkout_title' >
            Your Shopping Basket
          </h2>
          {
            state.basket.map((item)=>(
              <CheckoutProduct
              id={item.id}
              title ={item.title}
              image = {item.image}
              price = {item.price}
              rating = {item.rating}
              />
            ))
          }
        
        </div>
        
      </div>
      <div className='checkout_right' >
        <Subtotal/>

      </div>
     
      </div>
    </>
  )
}
