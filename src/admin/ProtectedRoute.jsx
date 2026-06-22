import { Navigate } from "react-router-dom";
import api from "../api";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    api.get("/check-auth", { withCredentials: true })
      .then((res) => {
        if (res.data.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setLoading(false);      
      });
  }, []);

  if (loading) return <h3>Checking authentication...</h3>;

  return isAuth ? children : <Navigate to="/admin-login" />;
}
