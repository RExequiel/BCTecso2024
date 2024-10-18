// RegisterMascotero.jsx
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, InputGroup, Container } from "react-bootstrap";
import { useState } from "react";
import MumaLogo from '../Components/Login/logo_muma';
import mascoterosService from "../services/mascoterosService";
import { Eye, EyeOff } from "react-feather";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Nombre y apellido son requeridos")
    .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, "Debes ingresar nombre y apellido"),
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

  const handleMascoteroSubmit = async (values) => {
    console.log("Valores del formulario:", values);
    try {
      const [nombre, ...resto] = values.fullName.split(" ");
      const apellido = resto.join(" ") || ""; 

      const mascoteroData = {
        nombre: nombre,          
        apellido: apellido,      
        email: values.email,
        password: values.password,
      };

      console.log("Datos de registro enviados:", mascoteroData);

      const response = await mascoterosService.registerMascotero(mascoteroData);

      if (response.mascotero.email == mascoteroData.email) {
        console.log("Respuesta:", response);
        navigate("/validacion", { state: { mascoteroName: response.mascotero.nombre, mascoteroEmail: response.mascotero.email } });
      } 
    } catch (error) {
      if (error.status === 400) {
        navigate("/registro");
      }
    }
  };

  return (
    <div className="bg-white vh-100 d-flex justify-content-center align-items-center">
      <div className="text-white rounded-2 py-4" style={{ width: "360px", height: "812px" }}>
        <div className="text-center mb-4">
          <MumaLogo />
        </div>

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
               <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                {showPassword ? (
                  <Eye style={{ color: "#F08318" }} />  
                ) : (
                  <EyeOff style={{ color: "#F08318" }} /> 
                )}
              </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.password} 
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

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
    <InputGroup.Text onClick={toggleConfirmPasswordVisibility} style={{ cursor: "pointer" }}>
      {showConfirmPassword ? (
        <Eye style={{ color: "#F08318" }} />  
      ) : (
        <EyeOff style={{ color: "#F08318" }} /> 
      )}
    </InputGroup.Text>
  </InputGroup>
  <Form.Control.Feedback type="invalid">
    {errors.confirmPassword}
  </Form.Control.Feedback>
</Form.Group>

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

export default RegisterMascotero;