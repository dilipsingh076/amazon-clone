import React from 'react'
import './Header.css'
import {useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
function Header() {
    const navigate = useNavigate()
    const [state,dispatch] = useStateValue()

    const handleAuthentication = () =>{
        if(state.user){
           auth.signOut()
        }
    }
    return (
        <div className='header' >
            <img onClick={()=> navigate('/')} className='header_logo' src='https://zeevector.com/wp-content/uploads/Amazon-Logo-White@zeevector.png' />
 
            <div className='header_search' >
                <input className='header_searchInput' type='text' />
                <SearchIcon className="header_searchIcon" />
                
            </div>
            <div className='header_nav' >

                <div onClick={()=> state.user ? handleAuthentication() : navigate('/login')} className='header_option'>
                    <span className='header_optionLineOne' > Hello {state.user ? state.user.email :'Guest'}</span>
                    <span className='header_optionLineTwo' > {state.user ? 'Sign Out' : 'Sign In'}</span>
                </div>
                <div onClick={()=> navigate('/orders')} className='header_option'>
                    <span className='header_optionLineOne' >Returns</span>
                    <span className='header_optionLineTwo' >&Orders</span>
                </div>
                <div className='header_option'>
                    <span className='header_optionLineOne' >Your</span>
                    <span className='header_optionLineTwo' >Prime</span>
                </div>

                <div className='header_optionBasket' >
                    <ShoppingBasketIcon onClick={()=>navigate('/checkout')} />
                    <span className='header_optionLineTwo header_basketCount' >{state.basket?.length}</span>
                </div>

                
            </div>


        </div>
    )
}

export default Header