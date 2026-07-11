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
              <p>Page not found.</p>
              <a href="/">Return to the home page</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
