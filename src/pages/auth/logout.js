// src/components/Logout.js
import { useEffect } from "react";
import Login from "./login";

function Logout() {
  useEffect(() => {
    window.localStorage.removeItem("token");
  }, []);

  return <Login />;
}

export default Logout;
