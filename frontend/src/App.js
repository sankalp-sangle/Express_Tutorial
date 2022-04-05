import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Info from "./pages/Info";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="settings" element={<Settings />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="forgotpassword" element={<Login />} />
            <Route path="signup" element={<Login />} />
            <Route path="moreinfo" element={<Info />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);