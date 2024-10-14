import React from 'react';
import styles from './ValidacionRegistro.module.css';
import EnviamosCorreoImg from '../../assets/img/icons/te-enviamos-correo.png'

const ValidacionCuenta = () => {
    return (
        <div className={styles["validation-container"]}>
            <div className={styles["image-container"]}>
                { <img 
                    src={EnviamosCorreoImg}
                    className={styles["image"]}
                /> }
            </div>
            <h2 className={styles["title"]}>Te enviamos un correo!</h2>
            <p className={styles["text"]}>
                Revisa tu correo, te va a llegar un mensaje de validación y deberás confirmar tu cuenta para finalizar con el registro.
            </p>
            <p className={styles["note"]}>
                *Recordá revisar en tu casilla de Spam o de Correo no deseado, a veces llega ahí.
            </p>
            <div className={styles["button-container"]}>
                <button className={styles["button"]} onClick={() => window.open('https://mail.google.com', '_blank')}>
                    Abrir correo
                </button>
            </div>
        </div>
    );
};

export default ValidacionCuenta;
