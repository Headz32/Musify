import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expires_in");
    navigate("/login");
  }, [navigate]);

  return null;
}

export default Logout;
