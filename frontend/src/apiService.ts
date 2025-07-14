import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const getDietas = async () => {
  const response = await api.get("nutricion/dietas/");
  return response.data;
};

export const getServicios = async () => {
  const response = await api.get("nutricion/servicios/");
  return response.data;
};

export const createMenu = async (menuData: any) => {
  const response = await api.post("nutricion/planeaciones/", menuData);
  return response.data;
};

// Interfaz para el tipo de Proceso
export interface Proceso {
  id: number;
  objeto_contratacion: string;
  estado: string;
  fecha_inicio: string;
  monto_estimado?: number;
  area_solicitante?: string;
}

export const getProcesos = async (): Promise<Proceso[]> => {
  const response = await api.get("adquisiciones/procesos/");
  return response.data;
};

export default api;
