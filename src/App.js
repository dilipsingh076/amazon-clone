import { useEffect } from 'react';
import './App.css';
import Checkout from './Checkout';
import Header from './Header';
import Home from './Home'
import Login from './Login'
import { Router, Route, Routes } from 'react-router-dom'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
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
      </Routes>

    </div>
  );
}

export default App;
