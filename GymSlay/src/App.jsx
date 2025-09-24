import ListCards from "./components/cards/ListCards";
import { Routes, Route } from "react-router"
import { Header } from "./components/header/Header"
import { MainLayout } from "./layouts/MainLayout"
import { SessionsPage } from "./pages/sessions/SessionsPage"

function App() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>
        <Route path="sessions" element={<SessionsPage />} />
          <Route path="sessiondetails" element={<ListCards />} />
        {/* Här lägger du in sidan som ska visas inuti MainLayout.
        Path är det som du skriver i urlen, typ localhost/sessions i detta fallet. */}
      </Route>

    </Routes>
  );
}

export default App;
