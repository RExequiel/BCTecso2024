import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Card, Button, Form, Badge } from 'react-bootstrap';
import mascotasService from '../../services/mascotasService';
import protectorasServices from '../../services/protectorasService';
import { BsPlus, BsSearch } from 'react-icons/bs';
import NavBar from '../NavBar';
import ProtectoraModal from '../../Pages/ProtectoraModal'; 

const HomeMascotero = () => {
  const [mascotas, setMascotas] = useState([]);
  const [protectoras, setProtectoras] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProtectora, setSelectedProtectora] = useState(null);

  const categories = ['🐱', '🐶', '🐹', '🐰'];

  useEffect(() => {
    const fetchMascotasYProtectoras = async () => {
      try {
        const [mascotasResponse, protectorasResponse] = await Promise.all([
          mascotasService.getMascotas(),
          protectorasServices.getProtectoras()
        ]);
        setMascotas(mascotasResponse);
        setProtectoras(protectorasResponse);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar las mascotas o protectoras. Por favor, intenta de nuevo.', err);
        setLoading(false);
      }
    };

    fetchMascotasYProtectoras();
  }, []);

  const handleProtectoraClick = (protectora) => {
    setSelectedProtectora(protectora); 
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedProtectora(null); 
  };

  if (loading) return (
    <Container className="text-center my-5">
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  return (
    <Container>
      <NavBar />
      <Container>
        <Row className="justify-content-between align-items-center my-3">
          <Col xs={9}>
            <Form.Control type="text" placeholder="Nombre; estado, protectora y sexo" />
          </Col>
          <Col xs={1}>
            <Button variant="outline-primary">
              <BsSearch />
            </Button>
          </Col>
        </Row>

        <Row className="my-3">
          <Col>
            <h5>Categorías</h5>
            <div className="d-flex flex-wrap">
              {categories.map((category, index) => (
                <Button key={index} variant="light" className="mx-1 my-1">
                  {category}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="my-3">
          <Col>
            <h5>Animales</h5>
            <Row>
              {mascotas.length > 0 ? (
                mascotas.map((animal, index) => (
                  <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                    <Card>
                      <Card.Img variant="top" src={animal.fotos[0]} alt={animal.nombre} />
                      <Card.Body>
                        <Card.Title>{animal.nombre}</Card.Title>
                        <Card.Text>
                          <span className="text-muted">{animal.ciudad}</span>
                          <br />
                          <Badge bg={animal.sexo === 'Macho' ? 'primary' : 'pink'}>
                            {animal.sexo === 'Macho' ? '♂' : '♀'}
                          </Badge>
                        </Card.Text>
                        <Button variant="outline-warning">
                          <BsPlus /> Editar
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No hay animales registrados actualmente</p>
              )}
            </Row>
          </Col>
        </Row>

        <Row className="my-3">
          <Col>
            <h5>Protectoras</h5>
            <Row>
              {protectoras.length > 0 ? (
                protectoras.map((protectora, index) => (
                  <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                    <Card onClick={() => handleProtectoraClick(protectora)} style={{ cursor: 'pointer' }}>
                      <Card.Body>
                        <Card.Title>{protectora.nombre}</Card.Title>
                        <Card.Text>
                          <span className="text-muted">{protectora.descripcion}</span>
                          <br />
                          <span className="text-muted">{protectora.ciudad}</span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No hay protectoras registradas actualmente</p>
              )}
            </Row>
          </Col>
        </Row>

        <ProtectoraModal show={showModal} handleClose={handleCloseModal} protectora={selectedProtectora} />

      </Container>
    </Container>
  );
}

export default HomeMascotero;
