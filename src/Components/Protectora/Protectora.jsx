import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styles from './Protectora.module.css';
import MumaLogo from '../icons/logo_muma';
import emailjs from 'emailjs-com';

const Protectora = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    email: '',
    contrasena: '',
    confirmarContrasena: '',
    provincia: '',
    ciudad: '',
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
  });

  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null); 

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/Combos/Provincias');
        setProvincias(response.data);
      } catch (error) {
        console.error('Error al obtener las provincias:', error);
      }
    };
    fetchProvincias();
  }, []);

  useEffect(() => {
    const fetchCiudades = async () => {
      if (formData.provincia) {
        try {
          const response = await axios.get(`http://localhost:8081/api/Combos/Ciudades/${formData.provincia}`);
          setCiudades(response.data);
        } catch (error) {
          console.error('Error al obtener las ciudades:', error);
        }
      }
    };
    fetchCiudades();
  }, [formData.provincia]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'confirmarContrasena') {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      setTypingTimeout(setTimeout(() => {
        validatePasswordMatch(e.target.value, formData.contrasena);
      }, 1000));
    }
  };

  const validatePasswordMatch = (confirmPassword, password) => {
    if (confirmPassword && password && confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmarContrasena: 'Las contraseñas no coinciden',
      }));
    } else {
      setErrors((prevErrors) => {
        const { confirmarContrasena, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre) newErrors.nombre = 'El nombre de la protectora es requerido';
    if (!formData.descripcion) newErrors.descripcion = 'La descripción es requerida';
    if (!formData.email) newErrors.email = 'El email es requerido';
    if (!formData.contrasena) {
      newErrors.contrasena = 'El campo contraseña es requerido';
    }
    if (!formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'El campo confirmar contraseña es requerido';
    } else if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
    }
    if (!formData.provincia) newErrors.provincia = 'La provincia es requerida';
    if (!formData.ciudad) newErrors.ciudad = 'La ciudad es requerida';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      emailjs.send('service_muma', 'template_muma', {
        email: formData.email,
        nombre: formData.nombre,
      }, 'tu_user_id')
        .then((response) => {
          console.log('Correo enviado!', response.status, response.text);
          setMessage('Registro exitoso. Por favor, revisa tu correo electrónico para confirmar tu cuenta.');
        })
        .catch((err) => {
          console.error('Error al enviar el correo:', err);
          setMessage('Hubo un error al enviar el correo. Inténtalo de nuevo.');
        });
    }
  };

  return (
    <div className={styles.container}>
      <MumaLogo />
      <h1 className={styles.title}>Registro Protectora</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {}
        <div className={styles.formGroup}>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? styles.errorInput : ''}
            placeholder="Nombre Protectora*"
          />
          {errors.nombre && <p className={styles.errorMessage}>{errors.nombre}</p>}
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className={errors.descripcion ? styles.errorInput : ''}
            placeholder="Descripción*"
          />
          {errors.descripcion && <p className={styles.errorMessage}>{errors.descripcion}</p>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.errorInput : ''}
            placeholder="Email*"
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            className={`${styles.input} ${errors.contrasena ? styles.errorInput : ''}`}
            placeholder="Contraseña*"
          />
          {errors.contrasena && <p className={styles.errorMessage}>{errors.contrasena}</p>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="confirmarContrasena"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            className={`${styles.input} ${errors.confirmarContrasena ? styles.errorInput : ''}`}
            placeholder="Confirmar Contraseña*"
          />
          {errors.confirmarContrasena && <p className={styles.errorMessage}>{errors.confirmarContrasena}</p>}
        </div>

        {}
        <div className={styles.formGroup}>
          <select
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className={errors.provincia ? styles.errorInput : ''}
            required
          >
            <option value="">Seleccione una provincia*</option>
            {provincias.map((provincia) => (
              <option key={provincia.id} value={provincia.id}>
                {provincia.nombre}
              </option>
            ))}
          </select>
          {errors.provincia && <p className={styles.errorMessage}>{errors.provincia}</p>}
        </div>

        {}
        <div className={styles.formGroup}>
          <select
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            className={errors.ciudad ? styles.errorInput : ''}
            required
          >
            <option value="">Seleccione una ciudad*</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
          {errors.ciudad && <p className={styles.errorMessage}>{errors.ciudad}</p>}
        </div>

        {}
        <div className={styles.formGroup}>
          <input
              type="text"
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              className={styles.input}
              placeholder="Calle"
          />
        </div>

        <div className={styles.inlineFormGroup}>
          <div className={styles.formGroup}>
              <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Número"
              />
          </div>
          <div className={styles.formGroup}>
              <input
                  type="text"
                  name="piso"
                  value={formData.piso}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Piso"
              />
          </div>
      </div>

      <div className={styles.formGroup}>
          <input
              type="text"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              className={styles.input}
              placeholder="Departamento"
          />
      </div>

        {}
        <div className={styles.formGroup}>
          <input
            type="text"
            name="sitioWeb"
            value={formData.sitioWeb}
            onChange={handleChange}
            className={styles.input}
            placeholder="Sitio Web"
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className={styles.input}
            placeholder="Instagram"
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className={styles.input}
            placeholder="Facebook"
          />
        </div>

        <button type="submit" className={styles.submitButton}>Registrar</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
      
      {isRegistered && (
        <div className={styles.success}>
          <p>¡Registro exitoso! Te hemos enviado un correo para confirmar tu cuenta.</p>
        </div>
      )}
    </div>
  );
};

export default Protectora;
