import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "../library";
import Player from "../player";
import Trending from "../trending";
import Feed from "../feed";
import Favorites from "../favorites";
import Sidebar from "../../components/sidebar";
import Login from "../auth/login";
import { setClientToken } from "../../spotify";

import "./home.css";

const TOKEN_EXPIRY_TIME = 3600 * 1000; // 1 hour in milliseconds

function Home() {
  const [token, setToken] = useState("");

  const setTokenInLocalStorage = (_token) => {
    const expiryTime = Date.now() + TOKEN_EXPIRY_TIME;
    window.localStorage.setItem("token", _token);
    window.localStorage.setItem("token_expiry", expiryTime);
    setClientToken(_token);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const expiryTime = window.localStorage.getItem("token_expiry");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      setTokenInLocalStorage(_token);
      setToken(_token);
    } else if (token && expiryTime) {
      if (Date.now() > expiryTime) {
        // Token is expired
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("token_expiry");
        setToken("");
      } else {
        setToken(token);
        setClientToken(token);
      }
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
