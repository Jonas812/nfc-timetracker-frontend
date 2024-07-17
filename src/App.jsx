import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timelog from "./pages/timelog/Timelog";
import User from "./pages/user/User";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timelog />} />
        <Route path="timelog" element={<Timelog />} />
        <Route path="user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
