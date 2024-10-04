import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MumaLogo from '../Components/icons/logo_muma';

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
  const handleSubmit = (values) => {
    console.log("Email:", values.email);
    console.log("Password:", values.password);
    axios
      .post("http://localhost:8081/api/Authentication/token", {
        user: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log("Response:", response.data?.token);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-white vh-100 justify-content-center align-items-center">
      <Container
        className="bg-white text-white rounded-2 py-4 align-self-center"
        style={{
          maxWidth: "400px",
          paddingTop: "50px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >

      <div>
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
                {/* <Form.Label>Email address</Form.Label> */}
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña*"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.password && touched.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group controlId="formBasicCheckbox" className="mt-1">
                <Form.Check
                  type="checkbox"
                  name="rememberMe"
                  label="Recordar contraseña"
                  style = {{color: "#000000"}}
                  checked={values.rememberMe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
              

              <div className="justify-content-center w-100">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4 align-self-center w-100"
                  style={{ backgroundColor: "#F08318", borderColor: "#F08318" }}
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
                  style={{ backgroundColor: "#ffff", borderColor: "#F08318", color: "#F08318" }}
                  disabled={isSubmitting}
                  //agregar onclick  register
                >
                  Crear cuenta
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default Login;
