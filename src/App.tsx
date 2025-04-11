import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Para manejar el estado de autenticación

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {  // Esta es la URL de tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: username, contrasena: password }), // 'username' y 'password' son del estado
      });

      const data = await response.json();

      if (response.ok) {
        // Almacenamos el token JWT en localStorage
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true); // Cambiamos el estado de autenticación
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setErrorMessage('Error en la conexión al servidor');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Eliminamos el token del almacenamiento
    setIsAuthenticated(false);  // Cambiamos el estado de autenticación
  };

  return (
    <>
      {!isAuthenticated ? (
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Usuario:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />
          <label htmlFor="password">Contraseña:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />
          <button type="submit">Iniciar sesión</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      ) : (
        <div>
          <h1>Bienvenido, {username}!</h1>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </>
  );
}

export default App;


