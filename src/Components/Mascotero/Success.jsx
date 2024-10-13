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
          <h4>¡Qué bueno que estés acá!</h4>
          <p>¡Listo ya ! Ya puedes empezar a usar tu cuenta.</p>
          <button className="open-email-btn" onClick={goToLogin}>Ir al login</button>
        </div>
      </div>
    );
  };
  
  export default Success;
