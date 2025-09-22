import React from 'react'
import { Header } from '../components/header/Header'
import SessionsPage from '../pages/sessions/SessionsPage'

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <SessionsPage />
    </div>
  )
}
