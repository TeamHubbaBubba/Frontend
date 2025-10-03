import ListCards from "./components/cards/ListCards";
import { Routes, Route } from "react-router"
import { Header } from "./components/header/Header"
import { MainLayout } from "./layouts/MainLayout"
import { SessionsPageUser } from "./pages/sessions/SessionsPageUser"
import { SessionsPageAdmin } from "./pages/sessions/SessionsPageAdmin"
import { CreateSessionPage } from "./pages/sessions/CreateSessionPage"
import { SignInModal } from "./components/forms/SignInModal";
import { RegisterModal } from "./components/forms/RegisterModal";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
          <Route path="sessionsuser" element={<SessionsPageUser />} />
          <Route path="sessionsadmin" element={<SessionsPageAdmin />} />
          <Route path="createsessions" element={<CreateSessionPage />} />
          <Route path="signin" element={<SignInModal />} />
          <Route path="register" element={<RegisterModal />} />
      </Route>
    </Routes>
  );
}

export default App;
