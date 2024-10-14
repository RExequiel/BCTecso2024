// RegisterMascotero.jsx
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, InputGroup, Container } from "react-bootstrap";
import { useState } from "react";
import MumaLogo from '../Components/Login/logo_muma';
import mascoterosService from "../services/mascoterosService";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Nombre y apellido son requeridos"),
  email: Yup.string()
    .email("Debe ingresar un email válido")
    .required("Email es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial."
    )
    .required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Debe confirmar la contraseña"),
});

function RegisterMascotero() {
  const navigate = useNavigate();

  // Manejar envío del formulario
  const handleMascoteroSubmit = async (values) => {
    console.log("Valores del formulario:", values);
    try {
      // Separar el nombre y apellido
      const [nombre, ...resto] = values.fullName.split(" ");
      const apellido = resto.join(" ") || ""; // Si no hay apellido, asigna una cadena vacía

      // Crear el objeto mascoteroData
      const mascoteroData = {
        nombre: nombre,          // El primer elemento es el nombre
        apellido: apellido,      // Todo lo demás es considerado el apellido
        email: values.email,
        password: values.password,
      };

      console.log("Datos de registro enviados:", mascoteroData);

      // Llamar al servicio de registro
      const response = await mascoterosService.registerMascotero(mascoteroData);
      console.log("Respuesta:", response);
      if (response.mascotero.id && response.mascotero.nombre) {
        console.log(`Usuario registrado con éxito: ID = ${response.mascotero.id}, Nombre = ${response.mascotero.nombre}`);
        // navigate("/")
        alert("Usuario `" + response.mascotero.nombre + "` con id `" + response.mascotero.id + "` registrado con exito");
      }
      
    } catch (error) {
      if (error.response.status === 400) {
        alert("El email ya se encuentra registrado. Por favor, inicia sesión.");
      }else{
      console.error("Error al registrar:", error);
      alert("Ocurrió un error al registrarse. Por favor, inténtelo de nuevo.");
      }
    }
  };

  return (
    <div className="bg-white vh-100 d-flex justify-content-center align-items-center">
      <div className="text-white rounded-2 py-4" style={{ width: "360px", height: "812px" }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <MumaLogo />
        </div>

        {/* Formulario de Mascotero */}
        <Mascotero onSubmit={handleMascoteroSubmit} />
      </div>
    </div>
  );
}

function Mascotero({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Container className="bg-white rounded-2 py-4">
      <Formik
        initialValues={{ fullName: "", email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Enviando formulario con valores:", values); // Agregar log aquí
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            
            {/* Nombre y apellido */}
            <Form.Group controlId="formBasicFullName">
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Nombre y apellido*"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.fullName && touched.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email*"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email && touched.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Contraseña */}
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña*"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password} // Verifica si el campo fue tocado y tiene errores
                />
                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password} {/* Muestra el mensaje de error si hay */}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Confirmar Contraseña */}
            <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar contraseña*"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                />
                <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? "Ocultar" : "Mostrar"}
                </Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Botón de enviar */}
            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={isSubmitting}
              style={{
                width: "328px",
                height: "50px",
                padding: "16px 25px",
                gap: "10px",
                borderRadius: "8px",
                backgroundColor: "#F08318",
                border: "none",
                display: "block",
                margin: "0 auto",        // Centra el botón horizontalmente
              }}
            >
              Registrarse
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default RegisterMascotero;