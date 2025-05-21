
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import GameListPage from "@/pages/GameListPage";
import AuthPage from "@/pages/AuthPage";
import AdminPage from "@/pages/AdminPage";
import TrialPlayerPage from "@/pages/TrialPlayerPage";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GameListPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/trial/:gameId" element={<TrialPlayerPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
