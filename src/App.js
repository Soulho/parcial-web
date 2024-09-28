import './App.css';
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import {FormattedMessage} from 'react-intl' ;

function App() {
  const [formValues, setFormValues] = useState({
    userName: "",
    password: ""
  });

  const [validationStates, setValidationStates] = useState({
    userNameState: true, // True when valid
    passwordState: true, // True when valid
  });

  const [errorMessage, setErrorMessage] = useState(""); // Para mostrar el error en la UI
  const navigate = useNavigate(); // Hook para la redirección

  // Validación simple de campos vacíos
  const validateUserName = (userName) => {
    return userName.length > 0; // Verificar que no esté vacío
  };

  const validatePassword = (password) => {
    return password.length > 0; // Verificar que no esté vacío
  };

  const handleUserChange = (e) => {
    setFormValues({ ...formValues, userName: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
  };

  const clickSubmit = () => {
    const isValidUserName = validateUserName(formValues.userName);
    const isValidPassword = validatePassword(formValues.password);

    setValidationStates({
      userNameState: isValidUserName,
      passwordState: isValidPassword,
    });

    if (isValidUserName && isValidPassword) {
      // Realizamos la petición POST al servidor
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: formValues.userName,
          password: formValues.password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json(); // Parseamos la respuesta
          } else if (response.status === 401) {
            throw new Error("Error de autenticación. Revise sus credenciales");
          } else {
            throw new Error("Error desconocido");
          }
        })
        .then((data) => {
          if (data.status === "success") {
            // Si las credenciales son correctas, redirigimos a Robots
            navigate("/robots");
          }
        })
        .catch((error) => {
          // Mostramos el mensaje de error debajo del botón de submit
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Por favor, rellena todos los campos correctamente.");
    }
  };

  return (
    <div className='App'>
      <NavBar></NavBar>
      <div className="container">
      

      <Form className="form-container">
        <Form.Group className="mb-6" controlId="formBasicUserName">
          <Form.Label><FormattedMessage id="Username"/></Form.Label>
          <Form.Control
            type="text"
            onChange={handleUserChange}
            value={formValues.userName}
            isInvalid={!validationStates.userNameState}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label><FormattedMessage id="Password"/></Form.Label>
          <Form.Control
            type="password"
            onChange={handlePasswordChange}
            value={formValues.password}
            isInvalid={!validationStates.passwordState}
          />
        </Form.Group>

        <div className="button-group">
          <Button id="login" variant="primary" onClick={clickSubmit}>
          <FormattedMessage id="Join"/>
          </Button>
          <Button id="cancel" variant="danger" onClick={() => setFormValues({ userName: '', password: '' })}>
          <FormattedMessage id="Cancel"/>
          </Button>
        </div>

        {errorMessage && (
          <div className="error-message">
            <strong><FormattedMessage id="Authentication error. Please check your credentials"/></strong>
          </div>
        )}
      </Form>
    </div>
    </div>
    
  );
}

export default App;
