import React from 'react'
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';


export default function CheckoutProduct({id,image,title,price,rating}) {
  const [state,dispatch] = useStateValue()
    const removeFromBasket = () =>{
        // remove the item from thebasket
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id:id,
        })
    }
    return (
    <div key={id} className='checkoutProduct' >
        <img className='checkoutProduct_image'  src={image} />

        <div className='checkoutProcut_info' >
            <p className='checkoutProduct_title' >{title}</p>
            <p className='checkoutProduct_price' >
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='checkoutProduct_rating' >
                {Array(rating).fill().map((_,i)=>(
                    <p>star</p>
                ))}
            </div>
            <button onClick={removeFromBasket} >Remove from basket</button>
        </div>

      
    </div>
  )
}
