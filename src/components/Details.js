import React from 'react';
import './Detail.css'; // Puedes añadir estilos personalizados si lo deseas

const Detail = ({ robot }) => {
  return (
    <div className="robot-details">
      <h1>Detalles del Robot</h1>
      {robot ? (
        <div>
          <p><strong>ID:</strong> {robot.id}</p>
          <p><strong>Nombre:</strong> {robot.nombre}</p>
          <p><strong>Modelo:</strong> {robot.modelo}</p>
          <p><strong>Empresa Fabricante:</strong> {robot.empresaFabricante}</p>
        </div>
      ) : (
        <p>Selecciona un robot para ver los detalles.</p>
      )}
    </div>
  );
};

export default Detail;
