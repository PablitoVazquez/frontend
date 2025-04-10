import { Navigate } from 'react-router-dom';

// Función para verificar si el token ha expirado
const isTokenExpired = (token: string | null) => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token JWT
  const exp = payload.exp; // El valor de expiración en el token

  if (!exp) return true;

  const expirationDate = new Date(exp * 1000); // Convertir a milisegundos
  return expirationDate < new Date(); // Si la fecha de expiración es anterior a la fecha actual, el token ha expirado
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');

  // Si no hay token o el token ha expirado, redirige al login
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/" />; // Redirige a /login si no hay token o si ha expirado
  }

  // Si hay token y no ha expirado, renderiza el contenido protegido
  return <>{children}</>;
}

export default ProtectedRoute;
