import { useEffect } from 'react';
import './App.css';
import Checkout from './Checkout';
import Header from './Header';
import Home from './Home'
import Login from './Login'
import { Router, Route, Routes } from 'react-router-dom'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import Orders from './Orders';

const promise  = loadStripe(
  "pk_test_51NEdDCSChJIakx4Pijkita4BJ2Vu5QUXHTmMMFfDMRoESce87dk4FxRXkFxqpksrz9gFElOAZvWU63BdNsXMmkeh00V7oGh29Y"
)

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    // will only  run once when the app componeet loads
    auth.onAuthStateChanged(authUser => {
      console.log("there user is >>>", authUser);
      if (authUser) {
        // the user just logged in/ the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else {
        // the user is logged out.
        dispatch({
          type: 'SET_USER',
          user: null
        })

      }
    })
  }, [])
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/payment' element={ <Elements stripe={promise} > <Payment/></Elements>} />
        <Route path='/orders' element={<Orders/>} />
     </Routes>

    </div>
  );
}

export default App;
