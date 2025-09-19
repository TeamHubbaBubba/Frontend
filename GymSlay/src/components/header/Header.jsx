import React from 'react'
import { MenuBtn } from '../buttons/MenuBtn'
import './header.css'
import { Link } from 'react-router-dom'


export const Header = () => {
  return (
    <header className='header'>
        <Link to="/">
        <img src="./images/logo.png" alt="GymSlay Logo" className='logo'/>
        </Link>
        <MenuBtn />

    </header>
  )
}
