import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/nutricion/menus">Menús</Link>
        </li>
        <li>
          <Link to="/almacen/inventario">Inventario</Link>
        </li>
        <li>
          <Link to="/adquisiciones/procesos">Procesos de Compra</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
