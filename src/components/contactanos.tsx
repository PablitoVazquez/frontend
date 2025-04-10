import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import "./contactanos.css"

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 Adventure Tours - Todos los derechos reservados.</p>
    </footer>
  );
}

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, email, mensaje } = formData;

    // Número de WhatsApp al que se enviará el mensaje (incluyendo el código de país)
    const numeroWhastApp = "+529984184992"; // Cambia este número por el que deseas usar

    // Construir el mensaje que será enviado
    const mensajeWhatsApp = `Nombre: ${nombre}%0ACorreo: ${email}%0AMensaje: ${mensaje}`;

    // Crear la URL para abrir WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhastApp}?text=${mensajeWhatsApp}`;

    // Redirigir a WhatsApp para enviar el mensaje
    window.open(urlWhatsApp, "_blank");

    // Limpiar el formulario después de enviar los datos
    setFormData({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Contáctanos</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="tucorreo@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                  name="mensaje"
                  className="form-control"
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contactanos;
