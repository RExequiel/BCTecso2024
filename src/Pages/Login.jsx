import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MumaLogo from '../Components/Login/logo_muma';
import authenticationService from "../services/authenticationService";

const validationSchema = Yup.object().shape({
  email: Yup.string("Debe ingresar su usuario")
    .email("Debe ingresar un email")
    .required("Usuario es requerido"),
  password: Yup.string()
    .matches(/^\d+$/, "La contraseña debe ser numérico")
    .required("La contraseña es requerida"),
});

function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log("Email:", values.email);
    console.log("Password:", values.password);

    try {
      const response = await authenticationService.login(values.email, values.password);
      console.log("Response:", response.data, values);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <Container
        className="bg-white vh-100 justify-content-center align-items-center text-white rounded-2 py-4 align-self-center"
        style={{
          maxWidth: "400px",
          paddingTop: "50px",
        }}
      >

      <div style={{marginTop: "10px"}}>
        <MumaLogo />
      </div>
        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit: formikHandleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={formikHandleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email*"
                  style={{height: "50px", backgroundColor: "#f0f0f0"}}
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
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña*"
                  style={{height: "50px", backgroundColor: "#f0f0f0"}}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.password && touched.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group controlId="formBasicCheckbox" className="mt-1 d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    name="rememberMe"
                    label="Recordame"
                    style={{ color: "#000000", marginRight: "10px", fontFamily: "Montserrat" }}
                    checked={values.rememberMe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Button
                    variant="link"
                    style={{ color: "#017179", textDecoration: "none", paddingLeft: 0, fontFamily: "Montserrat", marginLeft: "80px"}}
                    onClick={() => navigate("")}
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>
              </Form.Group>
              

              <div className="justify-content-center w-100">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 align-self-center w-100"
                  style={{backgroundColor: "#F08318", borderColor: "#F08318", color: "#FFFF", height: "50px", width: "328px", }}
                  disabled={isSubmitting}
                >
                  Ingresar
                </Button>
              </div>
              <div className="justify-content-center w-100">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 align-self-center w-100"
                  style={{ backgroundColor: "#ffff", borderColor: "#F08318", color: "#F08318", height: "50px", width: "328px", }}
                  disabled={isSubmitting}
                  onClick={() => navigate("/seleccionUsuario")}
                >
                  Crear cuenta
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
  );
}

export default Login;
