import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "../library";
import Player from "../player";
import Trending from "../trending";
import Feed from "../feed";
import Favorites from "../favorites";
import Sidebar from "../../components/sidebar";

import "./home.css";
import Login from "../auth/login";
import { setClientToken } from "../../spotify";

function Home() {
  const [token, setToken] = useState("");
  const [expirationTime, setExpirationTime] = useState(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    const storedExpirationTime = window.localStorage.getItem("expiration_time");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!storedToken && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get("access_token");
      const expiresIn = params.get("expires_in"); // Typically 3600 seconds
      const _expirationTime = new Date().getTime() + expiresIn * 1000;

      window.localStorage.setItem("token", _token);
      window.localStorage.setItem("expiration_time", _expirationTime);

      setToken(_token);
      setExpirationTime(_expirationTime);
      setClientToken(_token);
    } else if (storedToken && storedExpirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime < storedExpirationTime) {
        setToken(storedToken);
        setExpirationTime(storedExpirationTime);
        setClientToken(storedToken);
      } else {
        // Token has expired
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("expiration_time");
        setToken("");
        setExpirationTime(null);
      }
    }
  }, []);

  useEffect(() => {
    if (expirationTime) {
      const currentTime = new Date().getTime();
      const timeout = expirationTime - currentTime;

      if (timeout > 0) {
        const timer = setTimeout(() => {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("expiration_time");
          setToken("");
          setExpirationTime(null);
        }, timeout);

        return () => clearTimeout(timer);
      } else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("expiration_time");
        setToken("");
        setExpirationTime(null);
      }
    }
  }, [expirationTime]);

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
