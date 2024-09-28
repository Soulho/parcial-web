import React, { useState, useEffect } from 'react';
import './Detail.css';
import {FormattedMessage} from 'react-intl' ;

const Detail = ({ robotId }) => {
  const [robot, setRobot] = useState(null); // Estado para almacenar los detalles del robot
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Efecto que se ejecuta cuando cambia el robotId
  useEffect(() => {
    if (robotId) {
      setLoading(true);
      fetch(`http://localhost:3001/robots/${robotId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los detalles del robot");
          }
          return response.json();
        })
        .then((data) => {
          setRobot(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [robotId]);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!robot) {
    return <div>Selecciona un robot para ver los detalles.</div>;
  }

  // Construimos la URL dinámica para la imagen utilizando el robotId
  const imageUrl = `https://raw.githubusercontent.com/fai-aher/T34-Wiki-Backup/main/images/robot${robotId}.png`;
  

  return (
    <div className="robot-details">
      <h2>{robot.nombre}</h2>
      <img src={imageUrl} style={{ width: '300px', height: '300px' }} />
      <p><strong><FormattedMessage id="Year of manufacture"/></strong> {robot.añoFabricacion}</p>
      <p><strong><FormattedMessage id="Processing capacity"/></strong> {robot.capacidadProcesamiento}</p>
      <p><strong><FormattedMessage id="Mood"/></strong> {robot.humor}</p>
    </div>
  );
};

export default Detail;

