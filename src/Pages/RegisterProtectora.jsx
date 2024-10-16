// RegisterProtectora.jsx
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, InputGroup, Container } from "react-bootstrap";
import { useState } from "react";
import MumaLogo from '../Components/Login/logo_muma';
import protectorasService from "../services/protectorasService";

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre es requerido"),
  descripcion: Yup.string().required("Descripción es requerida"),
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

function RegisterProtectora() {
  const navigate = useNavigate();

  // Manejar envío del formulario
  const handleProtectoraSubmit = async (values) => {
    console.log("Valores del formulario:", values);
    try {
      // Crear el objeto protectoraData
      const protectoraData = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        email: values.email,
        password: values.password,
        provincia: values.provincia,
        nombreProvincia: values.nombreProvincia,
        ciudad: values.ciudad,
        nombreCiudad: values.nombreCiudad,
        calle: values.calle,
        numero: values.numero,
        piso: values.piso,
        cantidadDeMascotas: values.cantidadDeMascotas,
        departamento: values.departamento,
        sitioWeb: values.sitioWeb,
        instagram: values.instagram,
        facebook: values.facebook,
      };

      console.log("Datos de registro enviados:", protectoraData);

      // Llamar al servicio de registro
      const response = await protectorasService.registerProtectora(protectoraData);
      console.log("Respuesta:", response);
      if (response.protectora.id && response.protectora.nombre) {
        console.log(`Protectora registrada con éxito: ID = ${response.protectora.id}, Nombre = ${response.protectora.nombre}`);
        alert("Protectora `" + response.protectora.nombre + "` con id `" + response.protectora.id + "` registrada con exito");
      }
      
    } catch (error) {
      if (error.response.status === 400) {
        alert("Ocurrió un error al registrarse. Por favor, inténtelo de nuevo.");
      } else {
        alert("Ocurrio un error al registrarse. Por favor, inténtelo de nuevo.");
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

        {/* Formulario de Protectora */}
        <Protectora onSubmit={handleProtectoraSubmit} />
      </div>
    </div>
  );
}

function Protectora({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Container className="bg-white rounded-2 py-4">
      <Formik
        initialValues={{ nombre: "", descripcion: "", email: "", password: "", confirmPassword: "", provincia: "", nombreProvincia: "", ciudad: "", nombreCiudad: "", calle: "", numero: "", piso: "", cantidadDeMascotas: "", departamento: "", sitioWeb: "", instagram: "", facebook: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Enviando formulario con valores:", values);
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
            
            {/* Nombre */}
            <Form.Group controlId="formBasicNombre">
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Nombre Protectora*"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.nombre && touched.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Descripción */}
            <Form.Group controlId="formBasicDescripcion" className="mt-3">
              <Form.Control
                type="text"
                name="descripcion"
                placeholder="Descripción*"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.descripcion && touched.descripcion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.descripcion}
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
                  isInvalid={touched.password && !!errors.password}
                />
                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
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

            <Form.Group controlId="formBasicProvincia" className="mt-3">
              <Form.Control
                type="text"
                name="provincia"
                placeholder="Provincia*"
                value={values.provincia}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.provincia && touched.provincia}
              />
              <Form.Control.Feedback type="invalid">
                {errors.provincia}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicNombreProvincia" className="mt-3">
              <Form.Control
                type="text"
                name="nombreProvincia"
                placeholder="Nombre de la provincia*"
                value={values.nombreProvincia}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.nombreProvincia && touched.nombreProvincia}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreProvincia}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicCiudad" className="mt-3">
              <Form.Control
                type="text"
                name="ciudad"
                placeholder="Ciudad*"
                value={values.ciudad}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.ciudad && touched.ciudad}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ciudad}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicNombreCiudad" className="mt-3">
              <Form.Control
                type="text"
                name="nombreCiudad"
                placeholder="Nombre de la ciudad*"
                value={values.nombreCiudad}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.nombreCiudad && touched.nombreCiudad}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreCiudad}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicCalle" className="mt-3">
              <Form.Control
                type="text"
                name="calle"
                placeholder="Calle*"
                value={values.calle}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.calle && touched.calle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.calle}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicNumero" className="mt-3">
              <Form.Control
                type="text"
                name="numero"
                placeholder="Número*"
                value={values.numero}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.numero && touched.numero}
              />
              <Form.Control.Feedback type="invalid">
                {errors.numero}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPiso" className="mt-3">
              <Form.Control
                type="text"
                name="piso"
                placeholder="Piso"
                value={values.piso}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.piso && touched.piso}
              />
              <Form.Control.Feedback type="invalid">
                {errors.piso}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicCantidadDeMascotas" className="mt-3">
              <Form.Control
                type="number"
                name="cantidadDeMascotas"
                placeholder="Cantidad de Mascotas*"
                value={values.cantidadDeMascotas}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.cantidadDeMascotas && touched.cantidadDeMascotas}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cantidadDeMascotas}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicDepartamento" className="mt-3">
              <Form.Control
                type="text"
                name="departamento"
                placeholder="Departamento"
                value={values.departamento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.departamento && touched.departamento}
              />
              <Form.Control.Feedback type="invalid">
                {errors.departamento}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicSitioWeb" className="mt-3">
              <Form.Control
                type="text"
                name="sitioWeb"
                placeholder="Sitio Web"
                value={values.sitioWeb}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.sitioWeb && touched.sitioWeb}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sitioWeb}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicInstagram" className="mt-3">
              <Form.Control
                type="text"
                name="instagram"
                placeholder="Instagram"
                value={values.instagram}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.instagram && touched.instagram}
              />
              <Form.Control.Feedback type="invalid">
                {errors.instagram}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicFacebook" className="mt-3">
              <Form.Control
                type="text"
                name="facebook"
                placeholder="Facebook"
                value={values.facebook}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.facebook && touched.facebook}
              />
              <Form.Control.Feedback type="invalid">
                {errors.facebook}
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
                margin: "0 auto", 
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

export default RegisterProtectora;
