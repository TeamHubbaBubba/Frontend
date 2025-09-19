import { Routes, Route } from "react-router"
import { Header } from "./components/header/Header"
import { MainLayout } from "./layouts/MainLayout"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout />} />
    </Routes>
    </>
  )
}

export default App