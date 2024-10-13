import React from 'react';
import './Registro.css';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
      navigate("/");
    };

    return (
      <div className="registro">
        <div className="card">
          <div className="image-container">
            <img src="src/assets/img/dog-registro.png" alt="dog" className="dog"/>
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
  
  export default Registro;
