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
    const [token, setToken] = useState("");

    useEffect(() => {
      // Clear the token from localStorage initially
      window.localStorage.removeItem("token");
    
      const hash = window.location.hash;
      window.location.hash = "";
      if (hash) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("token", _token);
        setToken(_token);
        setClientToken(_token);
      } else {
        setToken(null);
        setClientToken(null);
      }
    }, []);
    
    return !token ?  (
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
