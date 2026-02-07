import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/Client";

export const authContext = createContext();

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("No hay contexto");
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    let listener;

    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        setUser(data?.session?.user ?? null);

        listener = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });
      } catch (err) {
        console.error("Error en AuthContext:", err);
      } finally {
        setLoadingAuth(false);
      }
    };

    initializeAuth();

    return () => {
      if (listener?.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <authContext.Provider value={{ user, loadingAuth }}>
      {children}
    </authContext.Provider>
  );
};
