import ListCards from "./components/cards/ListCards";
import { Routes, Route } from "react-router"
import { Header } from "./components/header/Header"
import { MainLayout } from "./layouts/MainLayout"
import { SessionsPage } from "./pages/sessions/SessionsPage"
import { CreateSessionPage } from "./pages/sessions/CreateSessionPage"
import { UserBookingsPage } from "./pages/sessions/UserBookingsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="sessiondetails" element={<ListCards />} />
          <Route path="createsessions" element={<CreateSessionPage />} />
          <Route path="userbookings" element={<UserBookingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
