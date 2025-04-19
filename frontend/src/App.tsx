import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { SettingPage } from "./components/SettingPage";
import { ProfilePage } from "./components/ProfilePage";
import { Navbar } from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SignUp from "./components/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isAuthChecking } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthChecking && !authUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size={36} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={!authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/setting"
          element={authUser ? <SettingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
