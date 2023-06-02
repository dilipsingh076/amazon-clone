import React from 'react'
import "./Home.css"
import Product from './Product'
import Header from './Header'
export default function Home() {
    return (
        <>
            <div className='home' >

                <div className='home_container' >
                    <img className='home_image' src='https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg' alt='homepic' />

                    <div className='home_row' >
                        <Product id={1} title={'the lean startup'} price={29.99} image={'https://m.media-amazon.com/images/I/31cQxf0GUeL._AC_SR400,600_.jpg'} rating={5} />
                        <Product id={2} title={'the lean startup'} price={29.99} image={'https://m.media-amazon.com/images/I/31cQxf0GUeL._AC_SR400,600_.jpg'} rating={5} />
                        <Product id={3} title={'the lean startup'} price={29.99} image={'https://m.media-amazon.com/images/I/31cQxf0GUeL._AC_SR400,600_.jpg'} rating={5} />
                    </div>
                    <div className='home_row' >
                        <Product id={4} title={'the lean startup'} price={29.99} image={'https://m.media-amazon.com/images/I/31cQxf0GUeL._AC_SR400,600_.jpg'} rating={5} />
                        <Product id={5} title={'the lean startup'} price={29.99} image={'https://m.media-amazon.com/images/I/31cQxf0GUeL._AC_SR400,600_.jpg'} rating={5} />
                        <Product id={6} title={'the lean startup'} price={29.99} image={'https://m.media-amazon.com/images/I/31cQxf0GUeL._AC_SR400,600_.jpg'} rating={5} />
                    </div>
                    <div className='home_row' >
                        <Product id={7} title={'the lean startup'} price={29.99} image={'https://m.media-amazon.com/images/I/31cQxf0GUeL._AC_SR400,600_.jpg'} rating={5} />
                        <Product id={8} title={'the lean startup'} price={29.99} image={'https://m.media-amazon.com/images/I/31cQxf0GUeL._AC_SR400,600_.jpg'} rating={5} />
                        <Product id={9} title={'the lean startup'} price={29.99} image={'https://m.media-amazon.com/images/I/31cQxf0GUeL._AC_SR400,600_.jpg'} rating={5} />
                    </div>




                </div>
            </div>
        </>
    )
}
