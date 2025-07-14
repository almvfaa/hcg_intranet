import React, { useEffect, useState } from "react";
import { getDietas, getServicios, createMenu } from "../apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Dieta {
  id: number;
  nombre: string;
}

interface Servicio {
  id: number;
  nombre: string;
}

const FormularioMenu: React.FC = () => {
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [dietaId, setDietaId] = useState("");
  const [servicioId, setServicioId] = useState("");
  const [fecha, setFecha] = useState("");
  const [tiemposComida, setTiemposComida] = useState("");
  const [platilloFuerte, setPlatilloFuerte] = useState("");
  const [postre, setPostre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDietas().then(setDietas);
    getServicios().then(setServicios);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createMenu({
        dieta: dietaId,
        servicio: servicioId,
        fecha: fecha,
        tiempos_comida: tiemposComida,
        platillo_fuerte: platilloFuerte,
        postre: postre,
      });

      // Mostrar notificación de éxito
      toast.success("Menú guardado correctamente");

      // Limpiar formulario
      setPlatilloFuerte("");
      setPostre("");
      setDietaId("");
      setServicioId("");
      setFecha("");
      setTiemposComida("");
    } catch (error: any) {
      // Mostrar notificación de error con el mensaje de la API
      const errorMessage =
        error.response?.data?.message || "Error al guardar el menú";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="formulario-menu">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dieta:</label>
          <select
            value={dietaId}
            onChange={(e) => setDietaId(e.target.value)}
            required
          >
            <option value="">Seleccione una dieta</option>
            {dietas.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Servicio:</label>
          <select
            value={servicioId}
            onChange={(e) => setServicioId(e.target.value)}
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tiempo de comida:</label>
          <input
            type="text"
            value={tiemposComida}
            onChange={(e) => setTiemposComida(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Platillo fuerte:</label>
          <input
            type="text"
            value={platilloFuerte}
            onChange={(e) => setPlatilloFuerte(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Postre:</label>
          <input
            type="text"
            value={postre}
            onChange={(e) => setPostre(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Menú"}
          </button>
        </div>
      </form>

      {/* Contenedor de notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <style>
        {`
          .formulario-menu {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .form-actions {
            margin-top: 20px;
            text-align: center;
          }
          .formulario-menu button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .formulario-menu button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
          .formulario-menu button:hover:not(:disabled) {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default FormularioMenu;
