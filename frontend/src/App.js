import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Info from "./pages/Info";
import Signup from "./pages/Signup";

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isUserAuthenticated: false
    };
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/"  
                element={ this.state.isUserAuthenticated ? <Navigate to ='/home' replace /> : <Navigate to ='/login' replace /> }/>
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="settings" element={<Settings />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="forgotpassword" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="moreinfo" element={<Info />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);