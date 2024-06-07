// src/components/Logout.js
import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expires_in");

    // Refresh the page to trigger the token check and show the login page
    window.location.reload();
  }, []);

  return null;
}

export default Logout;
