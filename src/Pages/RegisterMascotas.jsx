import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Image } from "react-bootstrap";
import mascotasService from "../services/mascotasService";
import mascotas from "../Components/Mascotas/Mascotas.module.css"

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El Nombre es requerido"),
  raza: Yup.string().required("La Raza es requerida"),
  sexo: Yup.string().required("El Sexo es requerido"),
  tamano: Yup.string().required("El Tamaño es requerida"),
  mesAnioNacimiento: Yup.string().required("La Fecha es requerida"),
  estado: Yup.string().required("El Estado es requerida"),
  temperamentoConAnimales: Yup.string().required("El Comportamiento con animales es requerido"),
  temperamentoConPersonas: Yup.string().required("El Comportamiento con personas es requerido"),
  ciudad: Yup.string().required("La Ciudad es requerida"),
});

function RegisterMascota() {
  const navigate = useNavigate();
  const [protectoras, setProtectoras] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProtectoras = async () => {
      try {
        const data = await protectorasService.getProtectoras();
        setProtectoras(data);
      } catch (error) {
        console.error("Error al cargar las protectoras:", error);
      }
    };

    fetchProtectoras();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Guarda la URL de la imagen para previsualización
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMascotaSubmit = async (values) => {
    try {
      const mascotaData = {
        nombre: values.nombre,
        tipoAnimal: values.tipoAnimal,
        raza: values.raza,
        sexo: values.sexo,
        tamano: values.tamano,
        mesAnioNacimiento: values.mesAnioNacimiento,
        estado: values.estado,
        temperamentoConAnimales: values.temperamentoConAnimales,
        temperamentoConPersonas: values.temperamentoConPersonas,
        protectoraId: values.protectoraId,
        ciudad: values.ciudad,
        descripcion: values.descripcion,
        fotos: values.fotos,
      };

      const response = await mascotasService.registerMascota(mascotaData);

      if (response.Mascota) {
        console.log("Mascota registrada:", response.Mascota);
        navigate("/mascota");
      }
    } catch (error) {
      console.error("Error al registrar la mascota:", error);
    }
  };

  return (
    <Container className={mascotas.formContainer}>
    <div className={mascotas.formCard}>
        <h4 className={mascotas.formTitle}>Registrar Mascotas</h4>
      <Formik
        initialValues={{ 
            nombre: "",
            especie: "",
            tipoAnimal: "",
            raza: "",
            sexo: "",
            tamano: "",
            mesAnioNacimiento: "",
            estado: "",
            temperamentoConAnimales: "",
            temperamentoConPersonas: "",
            protectoraId: "",
            ciudad: "",
            descripcion: "",
            fotos: ""
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
            handleMascotaSubmit(values);
            setSubmitting(false);
        }}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldValue  }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Control
                className={mascotas.formControl}
                type="text"
                name="nombre"
                placeholder="Nombre de la mascota"
                value={values.nombre}
                onChange={handleChange}
                isInvalid={!!errors.nombre}
              />
              <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="tipoAnimal">
              <Form.Control
                type="text"
                name="tipoAnimal"
                placeholder="Tipo mascota"
                value={values.tipoAnimal}
                onChange={handleChange}
                isInvalid={!!errors.tipoAnimal}
                className={mascotas.formControl}
              />
              <Form.Control.Feedback type="invalid">{errors.tipoAnimal}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="Raza">
                <Form.Control
                    as="select"
                    name="raza"
                    value={values.raza}
                    onChange={handleChange}
                    isInvalid={!!errors.raza}
                    className={mascotas.formControl}
                >
                    <option value="">Selecciona la Raza</option>
                    <option value="Pitbull">Pitbull</option>
                    <option value="Golden">Golden</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.raza}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="Sexo">
                <Form.Control
                    as="select"
                    name="sexo"
                    value={values.sexo}
                    onChange={handleChange}
                    isInvalid={!!errors.sexo}
                    className={mascotas.formControl}
                >
                    <option value="">Selecciona el Sexo*</option>
                    <option value="Hembra">Hembra</option>
                    <option value="Macho">Macho</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.sexo}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="Tamano">
              <Form.Control
                as="select"
                name="tamano"
                placeholder="Tamaño"
                value={values.tamano}
                onChange={handleChange}
                isInvalid={!!errors.tamano}
                className={mascotas.formControl}
              >

                <option value="">Selecciona el Tamaño*</option>
                <option value="tamano">0,5</option>
                <option value="tamano">0,7</option>
                </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.tamano}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="MesAnioNacimiento">
              <Form.Control
                type="date"
                name="mesAnioNacimiento"
                placeholder="Ingrese Fecha de Nacimiento"
                value={values.mesAnioNacimiento}
                onChange={handleChange}
                isInvalid={!!errors.mesAnioNacimiento}
                className={mascotas.formControl}
              />
              <Form.Control.Feedback type="invalid">{errors.mesAnioNacimiento}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="Estado">
              <Form.Control
                type="text"
                name="estado"
                placeholder="Estado"
                value={values.estado}
                onChange={handleChange}
                isInvalid={!!errors.estado}
                className={mascotas.formControl}
              />
              <Form.Control.Feedback type="invalid">{errors.estado}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="TemperamentoConAnimales">
              <Form.Control
                type="text"
                name="temperamentoConAnimales"
                placeholder="Temperamento con animales"
                value={values.temperamentoConAnimales}
                onChange={handleChange}
                isInvalid={!!errors.temperamentoConAnimales}
                className={mascotas.formControl}
              />
              <Form.Control.Feedback type="invalid">{errors.temperamentoConAnimales}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="TemperamentoConPersonas">
              <Form.Control
                type="text"
                name="temperamentoConPersonas"
                placeholder="Temperamento con personas"
                value={values.temperamentoConPersonas}
                onChange={handleChange}
                isInvalid={!!errors.temperamentoConPersonas}
                className={mascotas.formControl}
              />
              <Form.Control.Feedback type="invalid">{errors.temperamentoConPersonas}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="protectoraId">
              <Form.Control
                as="select"
                name="protectoraId"
                value={values.protectoraId}
                onChange={handleChange}
                isInvalid={!!errors.protectoraId}
                className={mascotas.formControl}
              >
                <option value="">Selecciona una protectora</option>
                {protectoras.map((protectora) => (
                  <option key={protectora.id} value={protectora.id}>
                    {protectora.nombre}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.protectoraId}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="Ciudad">
              <Form.Control
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                value={values.ciudad}
                onChange={handleChange}
                isInvalid={!!errors.ciudad}
                className={mascotas.formControl}
              />
              <Form.Control.Feedback type="invalid">{errors.ciudad}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="Descripcion">
              <Form.Control
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={values.descripcion}
                onChange={handleChange}
                isInvalid={!!errors.descripcion}
                className={mascotas.formControl}
              />
              <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="fotos">
              <Form.Control
                type="file"
                name="fotos"
                accept="image/*"  // Acepta solo imágenes
                onChange={(e) => {
                  handleImageChange(e);
                  setFieldValue("fotos", e.currentTarget.files[0]);  // Establece el archivo en Formik
                }}
                isInvalid={!!errors.fotos}
                className={mascotas.formControl}
              />
              <Form.Control.Feedback type="invalid">{errors.fotos}</Form.Control.Feedback>
            </Form.Group>

            {imagePreview && (
              <div className="imagePreview mt-3">
                <Image src={imagePreview} alt="Vista previa" thumbnail fluid />
              </div>
            )}

            <div className="d-flex justify-content-center align-items-center ">
                <Button className={mascotas.submitBtn} variant="primary" type="submit">Registrar</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </Container>
  );
}

export default RegisterMascota;
