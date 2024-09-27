import NavBar from "./NavBar";
import React, { useState, useEffect } from 'react';
import './robots.css';
import Detail from './Details'; // Importamos el componente Detail

const Robots = () => {
  const [robots, setRobots] = useState([]); // Estado para almacenar los robots
  const [selectedRobot, setSelectedRobot] = useState(null); // Estado para almacenar el robot seleccionado
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar posibles errores

  // Función para obtener los robots mediante una petición GET
  useEffect(() => {
    fetch("http://localhost:3001/robots")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setRobots(data); // Guardar los robots en el estado
        setLoading(false); // Cambiar el estado de carga a falso
      })
      .catch((error) => {
        setError(error.message); // Manejar el error
        setLoading(false); // Cambiar el estado de carga a falso
      });
  }, []); // El array vacío indica que este efecto se ejecuta solo una vez al montar el componente

  // Mostrar un mensaje de carga si los datos aún no han llegado
  if (loading) {
    return <div>Cargando robots...</div>;
  }

  // Mostrar un mensaje de error si hubo algún problema en la petición
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Función que maneja el clic en una fila para seleccionar un robot
  const handleRowClick = (robot) => {
    setSelectedRobot(robot); // Guardar el robot seleccionado en el estado
  };

  return (
    <div>
        <NavBar></NavBar>
        <div className="row">
      {/* Columna izquierda con la tabla de robots */}
      <div className="col left-col">
        <h1>Listado de Robots</h1>
        <table className="robots-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Modelo</th>
              <th>Empresa Fabricante</th>
            </tr>
          </thead>
          <tbody>
            {robots.map((robot) => (
              <tr key={robot.id} onClick={() => handleRowClick(robot)}>
                <td>{robot.id}</td>
                <td>{robot.nombre}</td>
                <td>{robot.modelo}</td>
                <td>{robot.empresaFabricante}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Columna derecha con los detalles del robot */}
      <div className="col right-col">
        <Detail robot={selectedRobot} /> {/* Pasamos el robot seleccionado como prop */}
      </div>
    </div>
    </div>
    
  );
};

export default Robots;
