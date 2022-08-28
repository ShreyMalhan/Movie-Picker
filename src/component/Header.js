import React from 'react'
import '../css/header.css'
import HeaderImage from '../../assets/header.png'

const Header = () => {
  return (
    <div className='container'>
        <div className="logo">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="logo" />
        </div>
        <div className="header">
            <div>
              <img src = {HeaderImage} alt="header"/>
            </div>
        </div>
    </div>
  )
}

export default Header