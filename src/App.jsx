import { Route, BrowserRouter, Routes } from "react-router-dom";
import { CarListPage } from "./pages/CarListPage";
import { CarDetailPage } from "./pages/CarDetailPage";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarListPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route
          path="*"
          element={
            <div className="page">
              <p>Səhifə tapılmadı.</p>
              <a href="/">Ana səhifəyə qayıt</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
