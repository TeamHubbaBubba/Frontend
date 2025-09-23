import React from 'react'
import { Header } from '../components/header/Header'
import { SessionsPage } from '../pages/sessions/SessionsPage'
import './layout.css'
import { Outlet } from 'react-router'

export const MainLayout = () => {
  return (
    <>
      <Header />
      
        <Outlet />
        {/* Här visas alla sidor som är inuti MainLayout, t.ex SessionsPage */}
    </>
  )
}
