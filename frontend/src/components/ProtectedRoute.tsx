import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    redirectPath?: string;
}

export const ProtectedRoute = ({ redirectPath = '/login' }: ProtectedRouteProps) => {
    // Verificar si existe el token en localStorage
    const isAuthenticated = localStorage.getItem('token') !== null;

    // Si no está autenticado, redirigir a la ruta especificada (por defecto /login)
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    // Si está autenticado, renderizar los componentes hijos usando Outlet
    return <Outlet />;
};
