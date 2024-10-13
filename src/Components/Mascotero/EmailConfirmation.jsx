import React from 'react';
import './EmailConfirmation.css';
import { useLocation } from 'react-router-dom';
import mascoterosService from '../../services/mascoterosService';

const EmailConfirmation = () => {
    const location = useLocation(); // Obtiene el objeto de ubicación
    const { mascoteroName, mascoteroEmail } = location.state || {};
  
    // Función para enviar el correo
    const sendEmail = async () => {
      try {
        alert("Enviando correo..." + mascoteroEmail);      
      } catch (error) {
        alert("Ocurrio un error al enviar el correo");
      }
    };
  
    return (
      <div className="email-confirmation">
        <div className="card">
          <div className="image-container">
            <img src="src/assets/img/dog-confirmation.png" alt="dog-confirmation" className="dog-image"/>
          </div>
          <h4>Te enviamos un correo, {mascoteroName}!</h4>
          <p>Revisa tu correo, te va a llegar un mensaje de validación y deberás confirmar tu cuenta para finalizar con el registro</p>
          <p>*Recordá revisar en tu casilla de Spam o de Correo no deseado, a veces llega ahí</p>
          <button className="open-email-btn" onClick={sendEmail}>Abrir correo</button>
        </div>
      </div>
    );
  };
  
  export default EmailConfirmation;
