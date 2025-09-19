import React from 'react'
import { MenuBtn } from '../buttons/MenuBtn'
import './header.css'


export const Header = () => {
  return (
    <header className='header'>
        <img src="./images/logo.png" alt="GymSlay Logo" className='logo'/>
        <MenuBtn />

    </header>
  )
}
