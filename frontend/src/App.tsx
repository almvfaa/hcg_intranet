import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MenusPage from './pages/nutricion/MenusPage';
import InventarioPage from './pages/almacen/InventarioPage';
import ProcesosPage from './pages/adquisiciones/ProcesosPage';
import Navigation from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <div className="layout">
                  <Navigation />
                  <div className="content">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/nutricion/menus" element={<MenusPage />} />
                      <Route path="/almacen/inventario" element={<InventarioPage />} />
                      <Route path="/adquisiciones/procesos" element={<ProcesosPage />} />
                      {/* Redirección por defecto al dashboard */}
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </div>
                </div>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
