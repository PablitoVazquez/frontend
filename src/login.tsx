interface Props {
    toggle: () => void;
}

export default function Login({ toggle }: Props) {
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form>
                <input type="email" placeholder="Correo electrónico" required />
                <input type="password" placeholder="Contraseña" required />
                <button type="submit">Ingresar</button>
                <a href="#">¿Olvidaste tu contraseña?</a>
            </form>
            <p>¿No tienes cuenta? <a href="#" onClick={toggle}>Regístrate aquí</a></p>
        </div>
    );
}
