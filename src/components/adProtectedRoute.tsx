// ProtectedRoute.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Navigate } from "react-router-dom";

// Tipado del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Componente de ruta protegida
const adProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // o un <Spinner />

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default adProtectedRoute;
