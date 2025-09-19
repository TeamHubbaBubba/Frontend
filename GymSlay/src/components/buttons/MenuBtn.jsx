import React from 'react'
import menuIcon from '../../assets/images/MenuBtn.svg'
import './buttons.css'

export const MenuBtn = () => {

    function handleClick() {
        const menu = document.getElementById('btn-menu');
        menu.classList.toggle('menu-active');
    }

  return (

    <button id='btn-menu' className='btn-menu' onClick={handleClick}>
      <img src={menuIcon} alt="Menu" />
    </button>

  )
}
