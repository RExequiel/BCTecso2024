import React from 'react';
import './Success.css';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
      navigate("/");
    };

    return (
      <div className="success">
        <div className="card">
          <div className="image-container">
            <img src="src/assets/img/dog-success.png" alt="dog" className="dog-success"/>
          </div>
          <h4>Este e-mail ya se 
          encuentra registrado.</h4>
          <p>Si no recordás tu contraseña podés 
            cambiarla desde el login ingresando en
            el enlace “Olvidé mi contraseña.</p>
          <button className="open-email-btn" onClick={goToLogin}>Ir al login</button>
        </div>
      </div>
    );
  };
  
  export default Success;
