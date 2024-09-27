import './App.css';
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";

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
            throw new Error("Credenciales incorrectas");
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
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            onChange={handleUserChange}
            value={formValues.userName}
            isInvalid={!validationStates.userNameState}
          />
          {!validationStates.userNameState && (
            <Form.Text className="text-danger">
              El nombre de usuario no puede estar vacío.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            onChange={handlePasswordChange}
            value={formValues.password}
            isInvalid={!validationStates.passwordState}
          />
          {!validationStates.passwordState && (
            <Form.Text className="text-danger">
              La contraseña no puede estar vacía.
            </Form.Text>
          )}
        </Form.Group>

        <div className="button-group">
          <Button id="login" variant="primary" onClick={clickSubmit}>
            Ingresar
          </Button>
          <Button id="cancel" variant="danger" onClick={() => setFormValues({ userName: '', password: '' })}>
            Cancelar
          </Button>
        </div>

        {/* Mostrar mensaje de error si las credenciales son incorrectas */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      </Form>
    </div>
    </div>
    
  );
}

export default App;
