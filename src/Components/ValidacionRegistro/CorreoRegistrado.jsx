import React from 'react';
import styles from './ValidacionRegistro.module.css';
import CorreoRegistradoImg from '../../assets/img/icons/email-registrado.png'
import { useNavigate } from 'react-router-dom';

const CorreoRegistrado = () => {

    const navigate = useNavigate(); 
    return (
        <div className={styles["validation-container"]}>
            <div className={styles["image-container"]}>
                { <img 
                    src={CorreoRegistradoImg}
                    className={styles["image"]} 
                /> }
            </div>
            <h2 className={styles["title"]}>Este e-mail ya se encuentra registrado.</h2>
            <p className={styles["text"]}>
            Si no recordás tu contraseña 
            podés cambiarla desde el login ingresando en el enlace “Olvidé mi contraseña”.
            </p>
            <div className={styles["button-container"]}>
                <button className={styles["button"]} onClick={() => navigate('/login')}>
                   Ir al login
                </button>
            </div>
        </div>
    );
};

export default CorreoRegistrado;
