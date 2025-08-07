import React from 'react'
import logoImage from '../assets/generated-image-removebg-preview.png';
import './Head.css'
const Header = () => {
  return (
    <header>
      <img src={logoImage} alt="Midnight Chef Logo" />
      <h1>Midnight Chef</h1>
    </header>
  )
}

export default Header