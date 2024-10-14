import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import styles from './Protectora.module.css';

const Protectora = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    email: '',
    contrasena: '',
    confirmarContrasena: '',
    provincia: '',
    nombreProvincia: '', 
    ciudad: '',
    nombreCiudad: '',
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

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

  const handleProvinciaChange = (e) => {
    const selectedProvincia = provincias.find(p => p.id === parseInt(e.target.value));
    setFormData({
      ...formData,
      provincia: selectedProvincia.id,
      nombreProvincia: selectedProvincia.nombre 
    });
  };

  const handleCiudadChange = (e) => {
    const selectedCiudad = ciudades.find(c => c.id === parseInt(e.target.value));
    setFormData({
      ...formData,
      ciudad: selectedCiudad.id,
      nombreCiudad: selectedCiudad.nombre 
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: formData.email,
      password: formData.contrasena,
      nombreUsuario: 'NombreUsuario',  
      apellidoUsuario: 'ApellidoUsuario',  
      nombreProtectora: formData.nombre,
      descripcion: formData.descripcion,
      sitioWeb: formData.sitioWeb || '',
      instagram: formData.instagram || '',
      facebook: formData.facebook || '',
      cantidadDeMascotas: 10, 
      direccion: {
        idCiudad: parseInt(formData.ciudad),
        calle: formData.calle,
        numero: formData.numero,
        piso: formData.piso || '',
        departamento: formData.departamento || '',
        provincia: {
          id: parseInt(formData.provincia),
          nombre: formData.nombreProvincia  
        },
        ciudad: {
          id: parseInt(formData.ciudad),
          nombre: formData.nombreCiudad,  
          idProvincia: parseInt(formData.provincia)
        }
      }
    };

    try {
      console.log(JSON.stringify(payload, null, 2));

      const response = await axios.post('http://localhost:8081/api/Protectoras/registro', payload);

      if (response.status === 200) {
        
        emailjs.send(
          'service_id', 
          'template_id', 
          {
            to_name: formData.nombre,
            to_email: formData.email,
          },
          'public_key' 
        ).then((result) => {
          console.log('Correo enviado:', result.text);
        }).catch((error) => {
          console.error('Error al enviar el correo:', error.text);
        });

        setIsRegistered(true);
        setMessage('¡Registro exitoso! Te hemos enviado un correo para confirmar tu cuenta.');
        navigate('/validacion-cuenta'); 
      } else {
        setMessage('Error al registrar la protectora.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'Correo ya registrado') {
        setMessage('El correo ya se encuentra registrado.');
        navigate('/correo-registrado'); 
      } else {
        console.error('Error al enviar los datos:', error);
        setMessage('Ocurrió un error al registrar la protectora.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={styles.input}
            placeholder="Nombre Protectora"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className={styles.input}
            placeholder="Descripción"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            className={styles.input}
            placeholder="Contraseña"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            name="confirmarContrasena"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            className={styles.input}
            placeholder="Confirmar Contraseña"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <select
            name="provincia"
            onChange={handleProvinciaChange}
            value={formData.provincia}
            className={styles.input}
            required
          >
            <option value="">Selecciona una Provincia</option>
            {provincias.map((provincia) => (
              <option key={provincia.id} value={provincia.id}>
                {provincia.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <select
            name="ciudad"
            onChange={handleCiudadChange}
            value={formData.ciudad}
            className={styles.input}
            required
          >
            <option value="">Selecciona una Ciudad</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            className={styles.input}
            placeholder="Calle"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            className={styles.input}
            placeholder="Número"
            required
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
        <button type="submit" className={styles.registroButton} disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
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
