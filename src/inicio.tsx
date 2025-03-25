import { useState } from "react";
import Login from "./login.tsx";
import Registro from "./registro.tsx";
import "./styles.css";

export default function App() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="app-container">
            {isLogin ? <Login toggle={toggleForm} /> : <Registro toggle={toggleForm} />}
        </div>
    );
}
