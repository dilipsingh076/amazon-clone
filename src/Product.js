import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'
export default function Product({id,title,image,price,rating}) {
    const [state,dispatch]  = useStateValue()
    // console.log(state.basket)
    const addToBasket = ()=>{
        // disptch the producet to data
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating
            }
        })
    }
  return (
    <div className='product' key={id} >
        <div className='product_info' >
            <p>{title}</p>
            <p className='product_price' >
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='product_rating' >
                {
                    Array(rating).fill().map((_,i)=>(
                        <p>🌟</p>
                    ))}
           
            </div>
            
        </div>
        <img src={image} alt='productimage' />
        <button onClick={addToBasket} >Add to Basket</button>

    </div>
  )
}
