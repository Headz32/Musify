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
import Logout from "../auth/logout";

function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";

    if (hash && hash.includes("access_token")) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else if (storedToken) {
      const expiresIn = window.localStorage.getItem("expires_in");
      const expiryTime = Number(expiresIn) * 1000; // converting seconds to milliseconds
      const now = Date.now();
      if (now >= expiryTime) {
        // Token has expired
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("expires_in");
        setToken("");
        setClientToken("");
      } else {
        // Token is still valid
        setToken(storedToken);
        setClientToken(storedToken);
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
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
