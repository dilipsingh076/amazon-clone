import React, { useEffect, useState } from 'react'
import './Orders.css'
import { db } from './firebase'
import { useStateValue } from './StateProvider'
import Order from './Order'

export default function Orders() {
  const [state,dispatch] = useStateValue()
  const [orders,setOrders] = useState([])
  useEffect(()=>{
    if(state.user){
      db.collection('users')
      .doc(state.user?.uid)
      .collection('orders')
      .orderBy('created','desc')
      .onSnapshot(snapshot=>(
        setOrders(snapshot.docs.map(doc=>({
          id:doc.id,
          data:doc.data()
        })))
      ))
    }
    else{
      setOrders([])
    }
    

  },[])
  return (
    <div className='orders' >
      <h1>Your Orders</h1>

      <div className='orders_order' >{orders?.map(order=>(
        <Order order={order} />
      ))}</div>
        

      
    </div>
  )
}
