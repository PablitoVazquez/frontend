interface Props {
    toggle: () => void;
}

export default function Registro({ toggle }: Props) {
    return (
        <div className="login-container">
            <h2>Registrarse</h2>
            <form>
                <input type="text" placeholder="Nombre completo" required />
                <input type="email" placeholder="Correo electrónico" required />
                <input type="password" placeholder="Contraseña" required />
                <input type="password" placeholder="Confirmar contraseña" required />
                <button type="submit">Registrarse</button>
            </form>
            <p>¿Ya tienes cuenta? <a href="#" onClick={toggle}>Inicia sesión aquí</a></p>
        </div>
    );
}
