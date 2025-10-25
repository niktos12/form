import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate("/main");
      } else {
        navigate("/auth");
      }
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  return null;
}

export default App;
