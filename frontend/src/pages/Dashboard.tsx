import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Nutrición</h3>
          <p>Gestión de menús y dietas</p>
        </div>
        <div className="card">
          <h3>Almacén</h3>
          <p>Control de inventario</p>
        </div>
        <div className="card">
          <h3>Adquisiciones</h3>
          <p>Procesos de compra</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
