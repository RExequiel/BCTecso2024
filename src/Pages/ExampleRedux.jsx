import { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import mascoterosService from '../services/mascoterosService';
import { addMascotero, editMascotero, removeMascotero } from '../redux/features/mascoteros/mascoteroSlice';

const ExampleRedux = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mascoteros = useSelector((state) => state.mascoteros.mascoteros);

  // States for form inputs
  const [newMascotero, setNewMascotero] = useState({ nombre: '', apellido: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const goToLogin = () => {
    navigate("/login");
  };

  // Fetch mascoteros on component mount
  useEffect(() => {
    const fetchMascoteros = async () => {
      try {
        const data = await mascoterosService.getMascoteros();
        data.forEach(mascotero => dispatch(addMascotero(mascotero)));
      } catch (error) {
        console.error("Error fetching mascoteros:", error);
      }
    };

    fetchMascoteros();
  }, [dispatch]);

  // Handle form input changes for new or edited mascoteros
  const handleChange = (e) => {
    setNewMascotero({
      ...newMascotero,
      [e.target.name]: e.target.value,
    });
  };

  // Add new mascotero
  const handleAddMascotero = () => {
    if (newMascotero.nombre && newMascotero.apellido && newMascotero.email) {
      dispatch(addMascotero(newMascotero)); // Dispatch action to add mascotero
      setNewMascotero({ nombre: '', apellido: '', email: '' }); // Clear form
    }
  };

  // Edit mascotero
  const handleEditMascotero = (mascotero) => {
    setIsEditing(true);
    setEditId(mascotero.id);
    setNewMascotero({ nombre: mascotero.nombre, apellido: mascotero.apellido, email: mascotero.email });
  };

  // Save edited mascotero
  const handleSaveEdit = () => {
    dispatch(editMascotero({ id: editId, ...newMascotero }));
    setIsEditing(false);
    setEditId(null);
    setNewMascotero({ nombre: '', apellido: '', email: '' });
  };

  // Remove mascotero
  const handleRemoveMascotero = (id) => {
    dispatch(removeMascotero(id));
  };

  return (
    <Container
      fluid
      className="d-flex vh-100 vw-100 bg-dark text-white align-items-center justify-content-center"
    >
      <Card bg="dark" text="white" className="p-4" style={{ width: "22rem" }}>
        <Card.Body>
          <Card.Title className="text-center">Bienvenido al ExampleRedux</Card.Title>
          <Card.Text className="text-center">
            Click para ir hacia el login:
          </Card.Text>
          <div className="d-flex justify-content-center">
            <Button onClick={goToLogin} variant="primary">
              Login
            </Button>
          </div>

          {/* Formulario para agregar/editar Mascotero */}
          <div className="mt-4">
            <h5>{isEditing ? "Editar Mascotero" : "Agregar Mascotero"}</h5>
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre"
                  name="nombre"
                  value={newMascotero.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formApellido" className="mt-2">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el apellido"
                  name="apellido"
                  value={newMascotero.apellido}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa el email"
                  name="email"
                  value={newMascotero.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                className="mt-3"
                variant={isEditing ? "success" : "primary"}
                onClick={isEditing ? handleSaveEdit : handleAddMascotero}
              >
                {isEditing ? "Guardar cambios" : "Agregar"}
              </Button>
            </Form>
          </div>

          {/* Lista de Mascoteros */}
          <div className="mt-4">
            <h5>Lista de Mascoteros</h5>
            {mascoteros.length > 0 ? (
              mascoteros.map((mascotero) => (
                <div key={mascotero.id} className="mt-2 border p-2">
                  <p><strong>Nombre:</strong> {mascotero.nombre}</p>
                  <p><strong>Apellido:</strong> {mascotero.apellido}</p>
                  <p><strong>Email:</strong> {mascotero.email}</p>
                  <Button
                    className="me-2"
                    variant="warning"
                    onClick={() => handleEditMascotero(mascotero)}
                  >
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleRemoveMascotero(mascotero.id)}>
                    Eliminar
                  </Button>
                </div>
              ))
            ) : (
              <p>No hay mascoteros disponibles</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExampleRedux;
