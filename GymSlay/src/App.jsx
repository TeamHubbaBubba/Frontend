import { Routes, Route } from "react-router"
import { Header } from "./components/header/Header"
import { MainLayout } from "./layouts/MainLayout"
import { SessionsPage } from "./pages/sessions/SessionsPage"
import { CreateSessionPage } from "./pages/sessions/CreateSessionPage"


function App() {

  return (
    <>
    <Routes>
      <Route element={<MainLayout />} path="/">
        <Route path="/session" element={<SessionsPage />} />
        <Route path="/create-session-secret-admin-url" element={<CreateSessionPage />} />
      </Route>
    </Routes>
    </>
  )
}

export default App