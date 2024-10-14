import { View, StyleSheet, Text } from "react-native-web";
import image1 from '../assets/img/Separtedelequipo.png';
import image2 from '../assets/img/Encontrátumejoramigo.png';
import { Button, Image } from 'react-bootstrap';
import '../Components/StartedScreen/StartedScreen.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartedScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }};

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      {currentStep === 1 && (
        <div className="text-center">
          <Image src={image1} alt="Logo" className="img-fluid mb-3" />
          <h2>Se parte del equipo</h2>
          <div>
            <p>Ayudalos a volver a casa difundiendo<br/>
              Información y colaborando con las<br/>
              protectoras para encontrarles un hogar.</p>
          </div>

          
          <div className="d-flex justify-content-center mb-3">
            <Button
              className={`btn ${currentStep === 1 ? 'btn-primary' : 'btn-light'}`}
              style={{width: "40px"}}
              onClick={() => goToStep(1)}
            >            
            </Button>
            <Button
              className={`btn ${currentStep === 2 ? 'btn-primary' : 'btn-light'}`}
              style={{width: "40px"}}
              onClick={() => goToStep(2)}
            >
            </Button>
          </div>

          <div className="mb-2">
            <Button 
              className="btn btn-primary me-2" 
              onClick={nextStep}
              style={{backgroundColor: "#F08318", borderColor: "#F08318", color: "#FFFF", height: "50px", width: "328px", }}>
              Siguiente
            </Button>
          </div>
          <Button 
            variant="link"
            onClick={() => navigate("/login")}>
            Omitir
          </Button>
        </div>
      )}
      {currentStep === 2 && (
        <div className="text-center">
          <Image src={image2} alt="Logo" className="img-fluid mb-2"/>
          <h2>Encontrá tu mejor amigo</h2>
          <div>
          <p>Si estás pensando en sumar<br/>
            un integrante más a tu familia<br/>
            ¿Por qué no adoptando?</p>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Button
              className={`btn ${currentStep === 1 ? 'btn-primary' : 'btn-light'}`}
              style={{width: "40px"}}
              onClick={() => goToStep(1)}
            >
            </Button>
            <Button
              className={`btn ${currentStep === 2 ? 'btn-primary' : 'btn-light'}`}
              style={{width: "40px"}}
              onClick={() => goToStep(2)}
            >
            </Button>
          </div>

          <div className="mb-2">
            <Button className="btn btn-primary me-2"
            onClick={() => navigate("/login")}
            style={{backgroundColor: "#F08318", borderColor: "#F08318", color: "#FFFF", height: "50px", width: "328px", }}>
              Comenzar
            </Button>
          </div>
          <Button 
            variant="link"
            onClick={() => navigate("/login")}>
            Omitir
          </Button>
        </div>
      )}
    </div>
  );
};

export default StartedScreen;
