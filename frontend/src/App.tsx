import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { SignUpPage } from "./components/Signup";
import { LoginPage } from "./components/LoginPage";
import { SettingPage } from "./components/SettingPage";
import { ProfilePage } from "./components/ProfilePage";
import { Navbar } from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

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
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
