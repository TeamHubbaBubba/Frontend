import React from 'react'
import menuIcon from '../../assets/images/MenuBtn.svg'
import './buttons.css'

export const MenuBtn = () => {
  return (

    <button className='btn-menu'>
      <img src={menuIcon} alt="Menu" />
    </button>

  )
}
