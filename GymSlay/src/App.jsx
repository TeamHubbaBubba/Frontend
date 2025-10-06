import ListCards from "./components/cards/ListCards";
import { Routes, Route } from "react-router"
import { Header } from "./components/header/Header"
import { MainLayout } from "./layouts/MainLayout"
import { SessionsPageUser } from "./pages/sessions/SessionsPageUser"
import { SessionsPageAdmin } from "./pages/sessions/SessionsPageAdmin"
import { CreateSessionPage } from "./pages/sessions/CreateSessionPage"
import { UserBookingsPage } from "./pages/sessions/UserBookingsPage";
import { EditSessionForm } from "./components/forms/EditSessionForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
          <Route path="sessionsUser" element={<SessionsPageUser />} />
          <Route path="sessionsAdmin" element={<SessionsPageAdmin />} />
          <Route path="createsessions" element={<CreateSessionPage />} />
          <Route path="userbookings" element={<UserBookingsPage />} />
          <Route path="editsession/:id" element={<EditSessionForm/>}/>
      </Route>
    </Routes>
  );
}

export default App;
