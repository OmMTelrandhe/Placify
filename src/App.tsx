import { Suspense, useEffect, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Auth from "./components/Auth";
import LandingPage from "./components/LandingPage";
import { supabase } from "./lib/supabase";
import routes from "tempo-routes";
import { User } from "@supabase/supabase-js";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    // Auth state will be updated automatically by the listener
  };

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const handleLogin = () => {
    setShowAuth(true);
  };

  const handleRegister = () => {
    setShowAuth(true);
  };

  const handleBackToLanding = () => {
    setShowAuth(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home user={user} />
              ) : showAuth ? (
                <Auth
                  onAuthSuccess={handleAuthSuccess}
                  onBack={handleBackToLanding}
                />
              ) : (
                <LandingPage
                  onGetStarted={handleGetStarted}
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                />
              )
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
