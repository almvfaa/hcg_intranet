import React, { useEffect, useState } from "react";
import { getProcesos, Proceso } from "../apiService";

export const TablaProcesos: React.FC = () => {
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcesos = async () => {
      setLoading(true);
      try {
        const data = await getProcesos();
        setProcesos(data);
      } catch (err) {
        setError("Error al cargar los procesos");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProcesos();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando procesos...</p>

        <style>
          {`
            .loading-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 40px;
            }

            .spinner {
              width: 40px;
              height: 40px;
              border: 4px solid #f3f3f3;
              border-top: 4px solid #3498db;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-bottom: 15px;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <div className="error-message">{error}</div>

        <style>
          {`
            .error-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px;
              background-color: #fff3f3;
              border-radius: 8px;
              margin: 20px;
            }

            .error-icon {
              font-size: 2em;
              margin-bottom: 10px;
            }

            .error-message {
              color: #dc3545;
              text-align: center;
              font-weight: 500;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className="tabla-procesos-container">
      <h2>Procesos de Adquisición</h2>
      <div className="tabla-responsive">
        <table className="tabla-procesos">
          <thead>
            <tr>
              <th>Objeto de Contratación</th>
              <th>Estado</th>
              <th>Fecha de Inicio</th>
              <th>Monto Estimado</th>
              <th>Área Solicitante</th>
            </tr>
          </thead>
          <tbody>
            {procesos.map((proceso) => (
              <tr key={proceso.id}>
                <td>{proceso.objeto_contratacion}</td>
                <td>
                  <span
                    className={`estado-badge estado-${proceso.estado.toLowerCase()}`}
                  >
                    {proceso.estado}
                  </span>
                </td>
                <td>{new Date(proceso.fecha_inicio).toLocaleDateString()}</td>
                <td>
                  {proceso.monto_estimado
                    ? `$${proceso.monto_estimado.toLocaleString()}`
                    : "N/A"}
                </td>
                <td>{proceso.area_solicitante || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
                .tabla-procesos-container {
                    padding: 20px;
                }

                .tabla-responsive {
                    overflow-x: auto;
                }

                .tabla-procesos {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    background: white;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .tabla-procesos th,
                .tabla-procesos td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                }

                .tabla-procesos th {
                    background-color: #f8f9fa;
                    font-weight: 600;
                    color: #495057;
                }

                .tabla-procesos tr:hover {
                    background-color: #f8f9fa;
                }

                .estado-badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.9em;
                    font-weight: 500;
                }

                .estado-pendiente {
                    background-color: #fff3cd;
                    color: #856404;
                }

                .estado-en-proceso {
                    background-color: #cce5ff;
                    color: #004085;
                }

                .estado-completado {
                    background-color: #d4edda;
                    color: #155724;
                }

                .estado-cancelado {
                    background-color: #f8d7da;
                    color: #721c24;
                }
            `}</style>
    </div>
  );
};
