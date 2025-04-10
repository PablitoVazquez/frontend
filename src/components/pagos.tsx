import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Pagos.css"; // Estilos personalizados para el modal

declare global {
  interface Window {
    paypal: any;
  }
}

const Pagos: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paypalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const queryParams = new URLSearchParams(location.search);
  const idReserva = queryParams.get("id_reserva");
  const monto = queryParams.get("monto"); // Obtener el monto de la URL
  const token = localStorage.getItem("token");

  const loadPaypalScript = () => {
    return new Promise((resolve, reject) => {
      if (document.getElementById("paypal-sdk")) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "paypal-sdk";
      // Aquí puedes poner tu client-id directamente en lugar de usar process.env
      script.src = `https://www.paypal.com/sdk/js?client-id=AcZJ7Wuc3jhQDANc1CSfTUIBeDZzWgnXa00nn_0vXPyUubW9SQQhU_1wxlgmHcWaoco413GB8EI-1X2F&currency=USD`;
      script.onload = () => resolve(true);
      script.onerror = () => reject("Error al cargar el SDK de PayPal");
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const setupPaypal = async () => {
      if (!idReserva || !token || !monto) {
        setError("Falta token de autenticación, ID de reserva o monto.");
        return;
      }

      try {
        // Crear la orden de pago
        const orderRes = await axios.post(
          "http://localhost:3000/api/payment",
          { amount: monto, id_reserva: idReserva }, // Usar el monto obtenido
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const orderId = orderRes.data.orderId;

        if (!orderId) {
          setError("No se pudo obtener el orderId de la creación de la orden.");
          return;
        }

        // Cargar el script de PayPal
        await loadPaypalScript();

        if (paypalRef.current && window.paypal) {
          window.paypal.Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: monto, // Usar el monto dinámico de la reserva
                    },
                  },
                ],
              });
            },
            onApprove: async (data: any, actions: any) => {
              try {
                // Capturar el pago
                const captureRes = await axios.post(
                  `http://localhost:3000/api/capture/${data.orderID}`,
                  { id_reserva: idReserva },
                  { headers: { Authorization: `Bearer ${token}` } }
                );

                if (captureRes.data.error) {
                  setError("Error al capturar el pago.");
                  return;
                }

                alert("Pago realizado con éxito 🎉");
                navigate("/inicio");
              } catch (err: any) {
                console.error("Error al capturar el pago:", err);
                setError("Error al capturar el pago.");
              }
            },
            onError: (err: any) => {
              console.error("Error con PayPal:", err);
              setError("Ocurrió un error con PayPal.");
            },
          }).render(paypalRef.current);
        }
      } catch (err: any) {
        console.error("Error al crear la orden:", err);
        setError("Error al crear la orden de pago");
      } finally {
        setLoading(false);
      }
    };

    setupPaypal();
  }, [idReserva, token, monto]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-center mb-4">Pago con PayPal</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p className="text-center">Cargando PayPal...</p>
        ) : (
          <div ref={paypalRef}></div>
        )}
      </div>
    </div>
  );
};

export default Pagos;