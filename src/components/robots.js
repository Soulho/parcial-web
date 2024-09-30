import React, { useState, useEffect } from 'react';
import './robots.css';
import Detail from './Details';
import {FormattedMessage} from 'react-intl' ;
import header from './panel grande.png';

const Robots = () => {
  const [robots, setRobots] = useState([]);
  const [selectedRobotId, setSelectedRobotId] = useState(null);  

  useEffect(() => {
    fetch("http://localhost:3001/robots")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setRobots(data); 
      })
      .catch((error) => {
      });
  }, []);

  const handleRowClick = (robot) => {
    setSelectedRobotId(robot.id);
  };

  return (
    <>
    <div>
    <h1> <FormattedMessage id="Adopt a Robot with Robot Lovers!"/></h1>
      <img src={header} alt="Robots Header" />
        <div className="row">
      {/* Columna izquierda con la tabla de robots */}
      <div className="col left-col">
        <table className="table">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th><FormattedMessage id="Name"/></th>
              <th><FormattedMessage id="Model"/></th>
              <th><FormattedMessage id="Manufacturer Company"/></th>
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


      <div className="col right-col">
        <Detail robotId={selectedRobotId} />
      </div>
    </div>
    </div>
    
    <footer className="footer-section">
      <p>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
    </footer>
    </>
    
  );
};

export default Robots;
