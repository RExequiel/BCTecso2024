import React from 'react';
import styles from './ValidacionRegistro.module.css';
import SuccessImagenImg from '../../assets/img/icons/que-bueno-estes-aca.png'
import { useNavigate } from 'react-router-dom';
const SuccesScreen = () => {
  const navigate = useNavigate();
    return (
        <div className={styles["validation-container"]}>
            <div className={styles["image-container"]}>
                { <img 
                    src={SuccessImagenImg}
                    className={styles["image"]}
                /> }
            </div>
            <h2 className={styles["title"]}>¡Qué bueno que estés acá!</h2>
            <p className={styles["text"]}>
            ¡Listo! Ya puedes empezar a usar tu cuenta.
            </p>
            <div className={styles["button-container"]}>
                <button className={styles["button"]} onClick={() => navigate('/login')}>
                    Ir al login
                </button>
            </div>
        </div>
    );
};

export default SuccesScreen;
