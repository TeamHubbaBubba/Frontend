import React from 'react'
import { Header } from '../components/header/Header'
import { Outlet } from 'react-router'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="wrapper">
        <Outlet />

      </main>
    </>
  )
}
