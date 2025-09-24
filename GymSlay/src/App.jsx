import { Routes, Route } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import ListCards from "./components/cards/ListCards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      {/* Ny route för att testa EventCards */}
      <Route path="/sessions" element={<ListCards />} />
    </Routes>
  );
}

export default App;
